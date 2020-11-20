import { ISetting } from 'src/app/models/setting.interface';

const STORED_SETTINGS = (storedSettings: ISetting) => {
  const settings: ISetting = {isMobileView: false,isTabletView: false,isMobileMenuOpen: false,isLightTheme: false,isSettingsOpen: false,isMenuTop: false,isMenuCollapsed: false,isBorderless: false,isSquaredBorders: false,isFixedWidth: false,isMenuShadow: false};
  Object.keys(storedSettings).forEach(key => {
    const item = JSON.parse(localStorage.getItem(`app.settings.${key}`))
    settings[key] = item === null ? storedSettings[key] : item
  })
  return settings
}
export const initialSettingState: ISettingState = {
  // default settings, if not exist in localStorage
  setting: {
    ...STORED_SETTINGS({
      isMobileView: false,
      isTabletView: false,
      isMobileMenuOpen: false,
      isLightTheme: true,
      isSettingsOpen: false,
      isMenuTop: false,
      isMenuCollapsed: false,
      isBorderless: true,
      isSquaredBorders: false,
      isFixedWidth: false,
      isMenuShadow: true,
    })
  }
}
export interface ISettingState {
  setting: ISetting;
}



