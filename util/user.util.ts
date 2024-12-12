import { IUserSettings } from "@/@types/user-settings";
import { DeepPartial } from "@/@types/utils.types";
import merge from 'lodash/merge';

const initUserSettings: IUserSettings = {
  daysWindow: 3,
  navBarSettings: {
    isOpen: true
  }
}

export const getUserSettings = (): IUserSettings => {
  const userSettings = localStorage.getItem('settings');
  if (!userSettings) {
    updateUserSettings(initUserSettings);
    return initUserSettings;
  }

  return JSON.parse(userSettings || '{}');
}

export const updateUserSettings = (settings: DeepPartial<IUserSettings>) => {
  console.log('new settings: ', initUserSettings);
  const userSettings: IUserSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  const updatedSettings = merge({}, userSettings, settings);

  localStorage.setItem('settings', JSON.stringify(updatedSettings));
}