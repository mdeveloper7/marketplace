import {createSelector} from 'reselect';

const selectAuth = state => state.auth;

export const selectAuthStore = createSelector(
  [selectAuth],
  auth => {
    return auth;
  }
);

export const selectUser = () =>
  createSelector(
    [selectAuth],
    auth => auth.user
  );