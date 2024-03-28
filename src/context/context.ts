import { createContext } from 'react';
import {ListItem, Theme, ThemeContextType, } from '../interfaces/generalInterfaces';


export const themeConfig = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const initialContext: ThemeContextType = {

  theme: themeConfig.light, // Tema inicial
  handleChangeTheme: () => {}, // Será sobreescrito más tarde
  
  headerFilter: '',
  handleBlurHaderFilter: () => {},

  itemList: [],
  setItemList: () => {},

};

// Creación del contexto con el objeto inicial
const ThemeContext = createContext<ThemeContextType>(initialContext);

export default ThemeContext;

