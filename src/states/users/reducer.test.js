import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

// Skenario Pengujian:
// 1. Menerima action dengan type RECEIVE_USERS untuk mengganti users dengan payload users.
// 2. Mengembalikan state awal jika action yang diterima tidak dikenal.

describe('usersReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = [];
    const action = {};
    const state = usersReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle RECEIVE_USERS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users: [{ id: 1, name: 'John Doe' }] },
    };
    const state = usersReducer(initialState, action);
    expect(state).toEqual(action.payload.users);
  });

  it('should return the same state if the action type is unknown', () => {
    const initialState = [{ id: 1, name: 'John Doe' }];
    const action = { type: 'UNKNOWN_ACTION' };
    const state = usersReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
