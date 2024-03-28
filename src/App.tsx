import React, { useEffect, useState } from "react";
import "./App.css";

import Header from "./sections/Header";
import Home from './sections/Home';
import ItemList from "./sections/ItemList";
import { ListItem, Theme, } from "./interfaces/generalInterfaces";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import ItemDetail from "./sections/ItemDetail";

import ThemeContext, { themeConfig } from "./context/context";

import GENERAL_CONSTANTS from "./constants/generalConstants";

const CONSTANTS = GENERAL_CONSTANTS.CONSTANTS;

/*
Pendientes:

  Añadir el debouncing al botón de búsquedas y dar una pasada general

  Crear git del proyecto del lunes
  Preparar deploy del proyecto del lunes

  Realizar 2 ejercicios, busqueda y otro
  Pasar useNavigate por context pa no repetir en todos lados *

  Responder psicometrico (para el viernes mejor en Cuerna)
*/

const NoMatch = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>No existe la ruta: 404</h2>
    </div>
  );
};

const App = () => {


  const [theme, setTheme] = useState<Theme>(themeConfig.light); // Estado inicial del tema

  const [headerFilter, setHeaderFilter] = useState<string | null>(""); // Estado inicial del tema
  const [itemList, setItemList] = useState<ListItem[]>(
    sessionStorage.getItem("item-ml") === null ||
      sessionStorage.getItem("item-ml") === "null"
      ? []
      : JSON.parse(sessionStorage.getItem("item-ml") ?? "")
  );

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      sessionStorage.setItem("item-ml", JSON.stringify(itemList));
      /*
      // Mostrar un mensaje de confirmación de salida en algunos navegadores:
      event.preventDefault();
      event.returnValue = '';
      */
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [itemList]); // Asegúrate de incluir todas las dependencias necesarias aquí

  // Función para cambiar el tema
  const handleChangeTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === themeConfig.dark ? themeConfig.light : themeConfig.dark
    );
  };

  const handleBlurHaderFilter = (value: string | null) => {
    setHeaderFilter(value);
  };

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme,
          handleChangeTheme,

          headerFilter,
          handleBlurHaderFilter,

          setItemList,
          itemList,
        }}
      >
        <div className="container">
          <Router>
            <Header />
            <main className="container-screen">
              <Routes>
                <Route
                  path={`${CONSTANTS.ROUTES.BASE_ROUTE}`}
                  element={<Home />}
                />
                <Route
                  path={`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}optimized`}
                  element={<ItemList isOptimized={true} />}
                />
                <Route
                  path={`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}unoptimized`}
                  element={<ItemList isOptimized={false} />}
                />
                <Route
                  path={`${CONSTANTS.ROUTES.ITEM_DETAIL_ROUTE}:id`}
                  element={<ItemDetail isDetail={true} />}
                />
                <Route
                  path={`${CONSTANTS.ROUTES.ITEM_ADD_ROUTE}`}
                  element={<ItemDetail isDetail={false} />}
                />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </main>
          </Router>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
