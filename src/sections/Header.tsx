import {
    ChangeEvent,
    KeyboardEvent,
    useState,
    useContext,
  } from "react";
  import Logo from "../images/mercado_libre_cabeza.jpg";
  import "../App.css";
  import CustomInput from "../components/CustomInput";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faSearch } from "@fortawesome/free-solid-svg-icons";
  
  import {
    useNavigate,
  } from "react-router-dom";
  
  import GENERAL_CONSTANTS from '../constants/generalConstants';

  import ThemeContext from '../context/context'; 

  
  const CONSTANTS = GENERAL_CONSTANTS.CONSTANTS;

const Header = () => {
    const { theme, handleChangeTheme, handleBlurHaderFilter, } = useContext(ThemeContext);
    let navigate = useNavigate();
    const [tsxValue, setTsxValue] = useState<string | null>(null);
  
    const onClickSearch = (tsxValueArg: string | null) => {
      const query = tsxValueArg;
      // navigate(`${CONSTANTS.ROUTES.BASE_ROUTE}optimized?q=${query}`);
      navigate(`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}optimized`);
      handleBlurHaderFilter(query);
      return null;
    };
  
    return (
      <header className="App-header">
        <div className="image-and-input-header">
          <img
            src={Logo}
            className="App-logo"
            alt="logo"
            width={"89px"}
            height={"25px"}
            onClick={() => {
              handleChangeTheme();
              navigate(CONSTANTS.ROUTES.BASE_ROUTE);
            }}
          />
          <div style={{ display: "flex" }}>
            <CustomInput
              defaultValue={""}
              type='text'
              disabled={false}
              readOnly={false}
              placeholder={"Buscar productos, marcas y más..."}
              className={"search-input"}
              style={{}}
              onBlur={(e: ChangeEvent<HTMLInputElement>, value: string) => {
                setTsxValue(value);
                
              }}
              onKeyPress={(
                e: KeyboardEvent<HTMLInputElement>,
                value: string | null
              ) => {
                if (e.charCode === 13) {
                  onClickSearch(value);
                  handleBlurHaderFilter(value);
                }
              }}
            />
            <div
              className="search-button"
              onClick={() => onClickSearch(tsxValue)}
            >
              <FontAwesomeIcon
                style={{
                  height: "12px",
                  width: "12px",
                  color: "#a7a790",
                }}
                icon={faSearch}
              />
            </div>
          </div>
        </div>
      </header>
    );
  };

  export default Header;