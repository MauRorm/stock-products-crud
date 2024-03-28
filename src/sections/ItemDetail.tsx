import React, {
  useEffect,
  useState,
  Suspense,
  ChangeEvent,
  KeyboardEvent,
  useContext,
} from "react";
import "../App.css";
import useFetch from "../customHooks/useFetch";
import CustomCard from "../components/CustomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faPencil,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ListItem,
  InterfaceItemList,
  InterfaceSize,
  HOCInterfaceList,
} from "../interfaces/generalInterfaces";

import CustomInput from "../components/CustomInput";

import ThemeContext from "../context/context";

import GENERAL_CONSTANTS from "../constants/generalConstants";

import productImage from '../images/image-product.jpg';

const BASE_URL_SERVER = GENERAL_CONSTANTS.BASE_URL_SERVER;
const CONSTANTS = GENERAL_CONSTANTS.CONSTANTS;


interface DescriptionInterface {
  isDetail: boolean;
}

const ItemDescription: React.FC<DescriptionInterface> = ({ isDetail }) => {
  let { id } = useParams();

  console.log("dedoieijdeoj ", isDetail);

  const { itemList, setItemList } = useContext(ThemeContext);

  let navigate = useNavigate();
  const [isToggleEdit, setIsToggleEdit] = useState<boolean>(false);
  const [detail, setDetail] = useState<ListItem | null>(null);
  const [descriptionDetail, setDescriptionDetail] = useState<string | null>("");
  const [priceDetail, setPriceDetail] = useState<string | null>("");
  const [data, error, callApi] = useFetch();

  const getInitialData = () => {
    const elementSelected = itemList.filter((element) => element.id === id)[0];
    return elementSelected ? elementSelected : null;
  };

  useEffect(() => {
    const onSetDetail = async () => {
      const elementSelected = getInitialData();
      setDetail(elementSelected);
      setPriceDetail(elementSelected !== null ? elementSelected.price : null);
      setDescriptionDetail(
        elementSelected !== null ? elementSelected.description : null
      );
    };
    onSetDetail();
  }, []);

  if (detail !== null) {
    const { urlImage, description, price } = detail;
    return (
      <CustomCard className="item-list-container">
        <FontAwesomeIcon
          style={{
            height: "20px",
            width: "20px",
            color: "#a7a790",
            fontSize: "2em",
            margin: "2px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}optimized`);
          }}
          icon={faArrowAltCircleLeft}
        />
        {isToggleEdit ? (
          <FontAwesomeIcon
            style={{
              height: "20px",
              width: "20px",
              color: "#0277bd",
              fontSize: "2em",
              margin: "2px",
              cursor: "pointer",
            }}
            onClick={() => {
              const newArray = itemList.map((element) => {
                if (element.id === id) {
                  element.description =
                    descriptionDetail === null ? "" : descriptionDetail;
                  element.price =
                    priceDetail === null
                      ? "$ "
                      : "$ " +
                        priceDetail.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return element;
                } else {
                  return element;
                }
              });
              setItemList(newArray);
              setDetail(newArray.filter((element) => element.id === id)[0]);
              setIsToggleEdit(!isToggleEdit);
            }}
            icon={faSave}
          />
        ) : (
          <FontAwesomeIcon
            style={{
              height: "20px",
              width: "20px",
              color: "#0277bd",
              fontSize: "2em",
              margin: "2px",
              cursor: "pointer",
            }}
            onClick={() => {
              setIsToggleEdit(!isToggleEdit);
            }}
            icon={faPencil}
          />
        )}

        <div style={{ display: "flex", margin: "1em" }}>
          <div>
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader" />
                </div>
              }
            >
              <img
                alt="image"
                src={urlImage}
                style={{ width: "22em", height: "auto" }}
              />
            </Suspense>
          </div>
          <div style={{ marginLeft: "1em" }}>
            <h2 style={{ marginTop: "0", fontSize: "20px", color: "#333" }}>
              {isToggleEdit ? (
                <CustomInput
                  defaultValue={description}
                  disabled={false}
                  type="text"
                  readOnly={false}
                  placeholder={"Descripción"}
                  className={"edit-input"}
                  style={{}}
                  onBlur={(e: ChangeEvent<HTMLInputElement>, value: string) => {
                    setDescriptionDetail(value);
                  }}
                  onKeyPress={(
                    e: KeyboardEvent<HTMLInputElement>,
                    value: string | null
                  ) => {}}
                />
              ) : (
                description
              )}
            </h2>
            <p style={{ marginTop: "0", fontSize: "24px" }}>
              {isToggleEdit ? (
                <CustomInput
                  defaultValue={price.replace("$", "")}
                  disabled={false}
                  readOnly={false}
                  type="number"
                  placeholder={"Precio"}
                  className={"edit-input"}
                  style={{}}
                  onBlur={(e: ChangeEvent<HTMLInputElement>, value: string) => {
                    setPriceDetail(value);
                  }}
                  onKeyPress={(
                    e: KeyboardEvent<HTMLInputElement>,
                    value: string | null
                  ) => {}}
                />
              ) : (
                price
              )}
            </p>
          </div>
        </div>
      </CustomCard>
    );
  } else if (isDetail === false) {
    return (
      <CustomCard className="item-list-container">
        <FontAwesomeIcon
          style={{
            height: "20px",
            width: "20px",
            color: "#a7a790",
            fontSize: "2em",
            margin: "2px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}optimized`);
          }}
          icon={faArrowAltCircleLeft}
        />
        <FontAwesomeIcon
          style={{
            height: "20px",
            width: "20px",
            color: "#0277bd",
            fontSize: "2em",
            margin: "2px",
            cursor: "pointer",
          }}
          onClick={() => {
            const validateString = (value: string | null) => {
              let isError = false;
              if (value === null || !value.trim()) {
                isError = true;
              }
              return isError;
            };
            let isError = false;
            if (validateString(priceDetail)) {
              isError = true;
            }
            if (validateString(descriptionDetail)) {
              isError = true;
            }
            if (isError) {
              alert("Los campos precio y descripción son requeridos");
            } else {
              const newArray = [...itemList];
              newArray.push({
                id: (newArray.length + 1).toString(),
                urlImage: productImage,
                price:
                  priceDetail === null
                    ? "$ "
                    : "$ " + priceDetail.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                description:
                  descriptionDetail === null ? "" : descriptionDetail,
                type: "",
                isLastElement: true,
              });
              setItemList(newArray);
              navigate(`${CONSTANTS.ROUTES.ITEM_LIST_ROUTE}optimized`);
            }
          }}
          icon={faSave}
        />

        <div style={{ display: "flex", margin: "1em" }}>
          <div>
            <Suspense
              fallback={
                <div className="loader-container">
                  <span className="loader" />
                </div>
              }
            >
              <img
                alt="image"
                src={productImage}
                style={{ width: "22em", height: "auto" }}
              />
            </Suspense>
          </div>
          <div style={{ marginLeft: "1em" }}>
            <h2 style={{ marginTop: "0", fontSize: "20px", color: "#333" }}>
              <CustomInput
                defaultValue={""}
                disabled={false}
                readOnly={false}
                placeholder={"Descripción"}
                className={"edit-input"}
                type="text"
                style={{}}
                onBlur={(e: ChangeEvent<HTMLInputElement>, value: string) => {
                  setDescriptionDetail(value);
                }}
                onKeyPress={(
                  e: KeyboardEvent<HTMLInputElement>,
                  value: string | null
                ) => {}}
              />
            </h2>
            <p style={{ marginTop: "0", fontSize: "24px" }}>
              <CustomInput
                defaultValue={""}
                disabled={false}
                readOnly={false}
                placeholder={"Precio"}
                type="number"
                className={"edit-input"}
                style={{}}
                onBlur={(e: ChangeEvent<HTMLInputElement>, value: string) => {
                  setPriceDetail(value);
                }}
                onKeyPress={(
                  e: KeyboardEvent<HTMLInputElement>,
                  value: string | null
                ) => {}}
              />
            </p>
          </div>
        </div>
      </CustomCard>
    );
  } else {
    return (
      <CustomCard className="item-list-container">
        <div className="loader-container">
          <span className="loader" />
        </div>
      </CustomCard>
    );
  }
};

export default ItemDescription;
