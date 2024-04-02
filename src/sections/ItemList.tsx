import React, { useEffect, useState, Suspense, useContext } from "react";
import "../App.css";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useFetch from "../customHooks/useFetch";
import CustomCard from "../components/CustomCard";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  ListItem,
  InterfaceItemList,
  InterfaceSize,
  HOCInterfaceList,
} from "../interfaces/generalInterfaces";
import CustomModal from "../components/CustomLoader";
import ThemeContext from "../context/context";
import productImage from '../images/image-product.jpg';
import GENERAL_CONSTANTS from "../constants/generalConstants";
import { string } from "yargs";

const BASE_URL_SERVER = GENERAL_CONSTANTS.BASE_URL_SERVER;
const CONSTANTS = GENERAL_CONSTANTS.CONSTANTS;

const Item: React.FC<ListItem> = ({
  urlImage,
  price,
  description,
  type,
  id,
  isLastElement,
}) => {
  let navigate = useNavigate();
  const { itemList, setItemList } = useContext(ThemeContext);
  return (
    <div
      onClick={() => {
        navigate(`${CONSTANTS.ROUTES.ITEM_DETAIL_ROUTE}${id}`);
      }}
      style={{
        display: "flex",
        height: "9em",
        margin: "1em",
        borderBottom: isLastElement ? "" : ".5px solid #dddcd7",
        width: "auto",
        cursor: "pointer",
      }}
    >
      <div>
        <Suspense
          fallback={
<CustomModal />
          }
        >
          <img
            alt="image"
            src={productImage}
            style={{ width: "9em", height: "auto" }}
          />
        </Suspense>
      </div>
      <div style={{ marginLeft: "1em" }}>
        <div style={{ display: "flex" }}>
          <h2 style={{ marginTop: "0", fontSize: "20px", color: "#333" }}>
            {description}
          </h2>
          <FontAwesomeIcon
            title={"Eliminar articulo " + description}
            style={{
              height: "20px",
              width: "20px",
              color: "#e96565",
              fontSize: "2em",
              marginLeft: "1em",
              marginTop: "4px",
              cursor: "pointer",
            }}
            onClick={(e: any) => {
              setItemList(itemList.filter((element) => element.id !== id));
              e.preventDefault();
              e.stopPropagation();
            }}
            icon={faTrash}
          />
        </div>

        <p style={{ marginTop: "0", fontSize: "24px" }}>{price}</p>
      </div>
    </div>
  );
};

const HOCListRendering = (ItemComponent: any) => {
  return function ({ isOptimized, list, headerFilter }: HOCInterfaceList) {
    if (
      headerFilter !== null &&
      list.length === 0 &&
      headerFilter.length === 0
    ) {
      return (
<CustomModal />
      );
    } else if (
      headerFilter !== null &&
      headerFilter.length > 0 &&
      list.length === 0
    ) {
      return (
        <div className="loader-container">
          <h2>No se han encontrado coincidencias</h2>
        </div>
      );
    }

    if (isOptimized) {
      return (
        <AutoSizer>
          {({ height, width }: InterfaceSize) => (
            <FixedSizeList
            // max-height: 100%
              height={height - 73}
              width={width}
              itemCount={list.length}
              itemSize={9 * 16} // Ajusta según la altura del elemento, transfoma em a px
              itemData={list}
            >
              {({ index, style }) => (
                <div key={list[index].id} style={style}>
                  {/*Sino se pasa la propiedad style, parpadea "blink" el componente al hacer scroll => <div key={list[index].id} style={style}>*/}

                  <ItemComponent {...list[index]} />
                </div>
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
      );
    } else {
      return (
        <div className="unoptimized-list">
          {list.map((item) => (
            <ItemComponent key={item.id} {...item} />
          ))}
        </div>
      );
    }
  };
};

const ListWithRendering = HOCListRendering(Item);

const ItemList: React.FC<InterfaceItemList> = ({ isOptimized }) => {
  // const [list, setList] = useState<ListItem[]>([]);
  const [data, error, callApi] = useFetch();

  const { headerFilter, setItemList, itemList } = useContext(ThemeContext);

  const getInitialData = async () => {




    let listData: ListItem[] = [];
    const response = await (callApi as (url: string) => Promise<any>)(
      `${BASE_URL_SERVER}${CONSTANTS.URL.GET_LIST}`
    );
    listData = response;
    setItemList(listData);
    return null;
  };

  useEffect(() => {



    const get = async () => {
      interface BankInterface {        
        age: string,
        bankName: string,
        description: string,
        url: string,
      }
      let banks: BankInterface[] = [];
      const responseBanks = await (callApi as (url: string) => Promise<any>)(
        `https://dev.obtenmas.com/catom/api/challenge/banks`
      );
      banks = responseBanks;

      return banks
    }
    get();




    
    itemList.length === 0 && getInitialData();
  }, []);

  let navigate = useNavigate();

  return (
    <CustomCard className="item-list-container-two">
      <button
        onClick={() => {
          navigate(`${CONSTANTS.ROUTES.ITEM_ADD_ROUTE}`);
        }}
        className="my-button"
        style={{ margin: "1em" }}
      >
        Añadir Elemento +
      </button>

      <Suspense
        fallback={
          <div className="loader-container">
            <span className="loader-two" />
          </div>
        }
      >
        <ListWithRendering
          isOptimized={isOptimized}
          headerFilter={headerFilter}
          list={
            headerFilter === null
              ? itemList
              : itemList.filter((item) =>
                  item.description
                    .toLowerCase()
                    .includes(headerFilter.toLowerCase())
                )
          }
        />
      </Suspense>
    </CustomCard>
  );
};

export default ItemList;
