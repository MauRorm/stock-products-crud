import React, {
  ChangeEvent,
  KeyboardEvent,
} from "react";

export interface CustomInputProps {
  defaultValue: string;
  onBlur: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>, value: string) => void; // Corregido a KeyboardEvent.
  className: string;
  disabled: boolean;
  readOnly: boolean;
  style: React.CSSProperties; // Correcto para los estilos.
  placeholder: string;
  type: string;
}

export interface DescriptionInterface {
  isDetail: boolean;
}


export interface CustomCardInterface {
  children: React.ReactNode;
  className: string | undefined;
}

export interface ListItem {
    urlImage: string;
    price: string;
    description: string;
    type: string;
    id: string;
    isLastElement: boolean;
  }

  export interface Theme {
    foreground: string;
    background: string;
  }
  
  export interface ThemeContextType {
    theme: Theme;
    handleChangeTheme: () => void;
  
    headerFilter: string | null;
    handleBlurHaderFilter: (value: string | null) => void;
  
    itemList: ListItem[];
    setItemList: (list: ListItem[]) => void;
  }

  export  interface InterfaceItem {
    defaultValue: string;
    onBlur: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    onKeyPress: (event: KeyboardEvent<HTMLInputElement>, value: string) => void; // Corregido a KeyboardEvent.
    className: string;
    disabled: boolean;
    readOnly: boolean;
    style: React.CSSProperties; // Correcto para los estilos.
    placeholder: string;
  }
  export  interface ElementProduct {
    id: string;
  }
  export interface InterfaceItemList {
    isOptimized: boolean;
  }
  export  interface InterfaceSize {
    height: number;
    width: number;
  }
 export interface HOCInterfaceList {
    isOptimized: boolean;
    list: ListItem[];
    headerFilter: string | null;
  }
