const BASE_URL_SERVER = "http://localhost:8000";
const CONSTANTS = {
  URL: {
    GET_LIST: "/api/get/elements",
    GET_ITEM_DETAIL: "/api/get/item/detail/",
  },
  ROUTES: {
    BASE_ROUTE: "/",
    ITEM_LIST_ROUTE: "/items/",
    ITEM_DETAIL_ROUTE: "/item/",
    ITEM_ADD_ROUTE: "/add/item",
  },
};

const GENERAL_CONSTANTS = {
    BASE_URL_SERVER,
    CONSTANTS,
};

export default GENERAL_CONSTANTS;