import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

// Skenario Pengujian:
// 1. Menerima action dengan type RECEIVE_THREADS untuk mengganti threads dengan payload threads.
// 2. Menambahkan thread baru menggunakan action dengan type ADD_THREAD.
// 3. Melakukan upvote terhadap thread dengan menggunakan action dengan type UPVOTE_THREAD.
// 4. Melakukan downvote terhadap thread dengan menggunakan action dengan type DOWNVOTE_THREAD.
// 5. Menetralisasi vote (baik upvote maupun downvote) dengan menggunakan action dengan type NEUTRALIZE_THREAD_VOTE.
// 6. Mengembalikan state awal jika action yang diterima tidak dikenal.

describe('threadsReducer', () => {
  it('should return the initial state when no action is provided', () => {
    const initialState = [];
    const action = {};
    const state = threadsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: [{ id: 1, title: 'First Thread', upVotesBy: [], downVotesBy: [] }] },
    };
    const state = threadsReducer(initialState, action);
    expect(state).toEqual(action.payload.threads);
  });

  it('should handle ADD_THREAD action', () => {
    const initialState = [
      { id: 1, title: 'First Thread', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: { id: 2, title: 'Second Thread', upVotesBy: [], downVotesBy: [] } },
    };
    const state = threadsReducer(initialState, action);
    expect(state).toEqual([action.payload.thread, ...initialState]);
  });

  it('should handle UPVOTE_THREAD action', () => {
    const initialState = [
      { id: 1, title: 'First Thread', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: { threadId: 1, userId: 'user1' },
    };
    const state = threadsReducer(initialState, action);
    expect(state[0].upVotesBy).toContain(action.payload.userId);
  });

  it('should handle DOWNVOTE_THREAD action', () => {
    const initialState = [
      { id: 1, title: 'First Thread', upVotesBy: [], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: { threadId: 1, userId: 'user1' },
    };
    const state = threadsReducer(initialState, action);
    expect(state[0].downVotesBy).toContain(action.payload.userId);
  });

  it('should handle NEUTRALIZE_THREAD_VOTE action', () => {
    const initialState = [
      { id: 1, title: 'First Thread', upVotesBy: ['user1'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_THREAD_VOTE,
      payload: { threadId: 1, userId: 'user1' },
    };
    const state = threadsReducer(initialState, action);
    expect(state[0].upVotesBy).not.toContain(action.payload.userId);
    expect(state[0].downVotesBy).not.toContain(action.payload.userId);
  });

  it('should return the same state if the action type is unknown', () => {
    const initialState = [
      { id: 1, title: 'First Thread', upVotesBy: [], downVotesBy: [] },
    ];
    const action = { type: 'UNKNOWN_ACTION' };
    const state = threadsReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
