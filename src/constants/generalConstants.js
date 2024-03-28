const BASE_URL_SERVER =
window.location.origin.indexOf('localhost') > -1 ? window.location.origin.replace('3000', '8000') : window.location.origin+window.location.port;
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