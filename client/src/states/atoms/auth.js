import { atom } from 'recoil';

export const authState = atom({
  key: 'authState', // unique ID
  default: false, // default value (not authenticated)
});


export const selectedEmailState = atom({
  key: 'selectedEmailState',
  default: null,
});

export const isSidebarOpenState = atom({
  key: 'isSidebarOpenState',
  default: false,
});

export const selectEmail = atom({
  key: 'isSelectEmail',
  default: false,
});

export const isLogoutPopupOpenState = atom({
  key: 'isLogoutPopupOpenState',
  default: false,
});

export const isDeleteAccountPopupOpenState = atom({
  key: 'isDeleteAccountPopupOpenState',
  default: false,
});


export const loadingState = atom({
  key: 'isLoading',
  default: false,
});