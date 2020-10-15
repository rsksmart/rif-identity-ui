import React from 'react';

const ThemeContext = React.createContext();

export const RifThemeProvider = ThemeContext.Provider;
export const RifThemeConsumer = ThemeContext.Consumer;

export { default as defaultTheme } from './defaultTheme';
export { default as ThemeInterface } from './themeInterface';

export default ThemeContext;
