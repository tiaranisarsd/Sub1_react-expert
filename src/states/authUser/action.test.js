/**
 * - asyncSetAuthUser  and asyncUnsetAuthUser  thunk functions test
 *   - asyncSetAuthUser
 *     - should dispatch actions correctly when login is successful
 *     - should alert an error message when login fails
 *   - asyncUnsetAuthUser
 *     - should dispatch actions correctly
 */

import {
  describe, it, expect, beforeEach, afterEach, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  setAuthErrorActionCreator,
  unsetAuthUserActionCreator
} from './action';

const fakeUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
};

const fakeErrorResponse = new Error('Login failed');

describe('asyncSetAuthUser and asyncUnsetAuthUser thunk functions', () => {
  beforeEach(() => {
    // Mocking API methods
    api.login = vi.fn();
    api.getOwnProfile = vi.fn();
    api.putAccessToken = vi.fn();
    global.alert = vi.fn(); // Mock alert
  });

  afterEach(() => {
    // Restore mocks
    vi.restoreAllMocks();
  });

  describe('asyncSetAuthUser ', () => {
    it('should dispatch actions correctly when login is successful', async () => {
      // Arrange
      api.login.mockResolvedValue('fake-token');
      api.getOwnProfile.mockResolvedValue(fakeUserResponse);
      const dispatch = vi.fn();

      // Action
      await asyncSetAuthUser({ email: 'john@example.com', password: 'password' })(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
      expect(dispatch).toHaveBeenCalledWith(setAuthErrorActionCreator(null));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should alert an error message when login fails', async () => {
      // Arrange
      api.login.mockRejectedValue(fakeErrorResponse);
      const dispatch = vi.fn();

      // Action
      try {
        await asyncSetAuthUser({ email: 'john@example.com', password: 'wrong-password' })(dispatch);
      } catch (error) {
        // Assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setAuthErrorActionCreator(fakeErrorResponse.message));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      }
    });

  });

  describe('asyncUnsetAuthUser ', () => {
    it('should dispatch actions correctly', () => {
      // Arrange
      const dispatch = vi.fn();

      // Action
      asyncUnsetAuthUser()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
