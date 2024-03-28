import React, {
  ChangeEvent,
  KeyboardEvent,
} from "react";

export interface ListItem {
    urlImage: string;
    price: string;
    description: string;
    type: string;
    id: string;
    isLastElement: boolean;
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
