import { createContext } from 'react';

interface ListItem {
  urlImage: string;
  price: string;
  description: string;
  type: string;
  id: string;
  isLastElement: boolean;
}

// Tus interfaces
interface Theme {
  foreground: string;
  background: string;
}

interface ThemeContextType {
  theme: Theme;
  handleChangeTheme: () => void;

  headerFilter: string | null;
  handleBlurHaderFilter: (value: string | null) => void;

  itemList: ListItem[];
  setItemList: (list: ListItem[]) => void;
}

// Definición de temas simplificada
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

// Objeto inicial para ThemeContext
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

