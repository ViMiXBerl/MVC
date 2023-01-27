const API_URL = "http://localhost:3000/api";
const STORES_API_URL = "/Stores";
const REL_PRODUCTS_API_URL = `/rel_Products?`;

const REL_PRODUCTS_OK_API_URL = `/rel_Products?${encodeURI(
    `filter={"where":{"Status":{"like":"OK"}}}`
)}`;
const REL_PRODUCTS_STORAGE_API_URL = `/rel_Products?${encodeURI(
    `filter={"where":{"Status":{"like":"STORAGE"}}}`
)}`;
const REL_PRODUCTS_OUT_OF_STOCK_API_URL = `/rel_Products?${encodeURI(
    `filter={"where":{"Status":{"like":"OUT_OF_STOCK"}}}`
)}`;

const OK = "OK";
const STORAGE = "STORAGE";
const OUT_OF_STOCK = "OUT_OF_STOCK";
