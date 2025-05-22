/**
 * - isPreloadReducer function test
 *   - should return the initial state when given an unknown action
 *   - should return false when given SET_IS_PRELOAD action with false payload
 *   - should return true when given SET_IS_PRELOAD action with true payload
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return false when given SET_IS_PRELOAD action with false payload', () => {
    // Arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(false);
  });

  it('should return true when given SET_IS_PRELOAD action with true payload', () => {
    // Arrange
    const initialState = false;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: true,
      },
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(true);
  });
});