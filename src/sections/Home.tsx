import "../App.css";

import {
  useNavigate,
} from "react-router-dom";



import GENERAL_CONSTANTS from "../constants/generalConstants";

const CONSTANTS = GENERAL_CONSTANTS.CONSTANTS;

const Home = () => {
    let navigate = useNavigate();
  
    return (
      <div>
        <div className="title-home">
          <h2>Bienvenido</h2>
          <p className="clear-margin-top">¡Encuentra lo que estás buscando!</p>
        </div>
  
        <div className="buttons-container">
          <button
            onClick={() => {
              navigate(`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}optimized`);
            }}
            className="my-button"
          >
            Ir a la versión optimizada con react-window (15,000 elementos)
          </button>
          &nbsp;
          <button
            onClick={() => {
              navigate(`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}unoptimized`);
            }}
            className="my-button"
          >
            Ir a la versión no optimizada (5,000 elementos)
          </button>
        </div>
      </div>
    );
  };

  export default Home;