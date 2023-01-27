/**
 * View class. Knows everything about dom & manipulation and a little bit about data structure, which should be
 * filled into UI element.
 *
 * @constructor
 */

function View() {
    /**
     * Template for getting store products with OK status from local server.
     * @constant
     * @type {string}
     */
    var OK = "OK";

    /**
     * Template for getting store products with STORAGE status from local server.
     * @constant
     * @type {string}
     */
    var STORAGE = "STORAGE";

    /**
     * Template for getting store products with OUT_OF_STOCK status from local server.
     * @constant
     * @type {string}
     */
    var OUT_OF_STOCK = "OUT_OF_STOCK";

    /**
     * ID of the "stores list wrapper".
     * @constant
     * @type {string}
     */
    var STORES_LIST_WRAPPER = "jsStoresListWrapper";

    /**
     * Returns the stores list wrapper.
     *
     * @returns {HTMLDivElement} the div element.
     */
    this.getStoresListWrapper = function() {
        return document.querySelector("#" + STORES_LIST_WRAPPER);
    };

    /**
     * ID of the "stores details".
     * @constant
     * @type {string}
     */
    var MAIN_STORE_DETAILS = "jsMainStoreDetails";

    /**
     * Returns the main store details.
     *
     * @returns {HTMLSectionElement} the section element.
     */
    this.getMainStoreDetails = function() {
        return document.querySelector("#" + MAIN_STORE_DETAILS);
    };

    /**
     * Returns the main store details without js-display-type_none class.
     *
     * @returns {HTMLSectionElement} the section element.
     */
    this.getMainStoreDetailsWithoutJsDisplayTypeNoneClass = function() {
        return this.getMainStoreDetails().classList.remove(
            "js-display-type_none"
        );
    };

    /**
     * ID of the "not selected stores".
     * @constant
     * @type {string}
     */
    var NOT_SELECTED_STORES_WRAPPER = "jsNotSelectedStores";

    /**
     * Returns the not selected stores wrapper.
     *
     * @returns {HTMLSectionElement} the section element.
     */
    this.getNotSelectedStoresWrapper = function() {
        return document.querySelector("#" + NOT_SELECTED_STORES_WRAPPER);
    };

    /**
     * Returns the not selected stores wrapper with js-display-type_none class.
     *
     * @returns {HTMLSectionElement} the section element.
     */
    this.getNotSelectedStoresWrapperWithJsDisplayTypeNone = function() {
        return this.getNotSelectedStoresWrapper().classList.add(
            "js-display-type_none"
        );
    };

    /**
     * ID of the "store email contact details".
     * @constant
     * @type {string}
     */
    var CONTACT_DETAILS_EMAIL = "jsContactDetailsEmail";

    /**
     * Returns store email contact details.
     *
     * @returns {HTMLSpanElement} the span element.
     */
    this.getContactDetailsEmail = function() {
        return document.querySelector("#" + CONTACT_DETAILS_EMAIL);
    };

    /**
     * ID of the "phone number contact details".
     * @constant
     * @type {string}
     */
    var CONTACT_DETAILS_PHONE_NUMBER = "jsContactDetailsNumber";

    /**
     * Returns phone number contact details.
     *
     * @returns {HTMLSpanElement} the span element.
     */
    this.getContactDetailsPhoneNumber = function() {
        return document.querySelector("#" + CONTACT_DETAILS_PHONE_NUMBER);
    };

    /**
     * ID of the "Address contact details".
     * @constant
     * @type {string}
     */
    var CONTACT_DETAILS_ADDRESS = "jsContactDetailsAddress";

    /**
     * Returns address contact details.
     *
     * @returns {HTMLSpanElement} the span element.
     */
    this.getContactDetailsAddress = function() {
        return document.querySelector("#" + CONTACT_DETAILS_ADDRESS);
    };

    /**
     * ID of the "Established date contact details".
     * @constant
     * @type {string}
     */
    var CONTACT_DETAILS_ESTABLISHED_DATE = "jsContactDetailsEstablishedDate";

    /**
     * Returns established date contact details.
     *
     * @returns {HTMLSpanElement} the span element.
     */
    this.getContactDetailsEstablishedDate = function() {
        return document.querySelector("#" + CONTACT_DETAILS_ESTABLISHED_DATE);
    };

    /**
     * ID of the "Floor area contact details".
     * @constant
     * @type {string}
     */
    var CONTACT_DETAILS_FLOOR_AREA = "jsContactDetailsFloorArea";

    /**
     * Returns floor area contact details.
     *
     * @returns {HTMLSpanElement} the span element.
     */
    this.getContactDetailsFloorArea = function() {
        return document.querySelector("#" + CONTACT_DETAILS_FLOOR_AREA);
    };

    /**
     * ID of the "Busy indicator products table".
     * @constant
     * @type {string}
     */
    var PRODUCTS_TABLE_SPINNER = "jsProductsTableSpinner";

    /**
     * Returns busy indicator products table.
     *
     * @returns {HTMLDivElement} the div element.
     */
    this.getProductsTableSpinner = function() {
        return document.querySelector("#" + PRODUCTS_TABLE_SPINNER);
    };

    /**
     * ID of the "Products table store details".
     * @constant
     * @type {string}
     */
    var PRODUCTS_TABLE = "jsProductsTable";

    /**
     * Returns products table store details.
     *
     * @returns {HTMLTableElement} the table element.
     */
    this.getProductsTable = function() {
        return document.querySelector("#" + PRODUCTS_TABLE);
    };

    /**
     * ID of the "Count of products with status OK of the filter form".
     * @constant
     * @type {string}
     */
    var PRODUCT_OK = "jsProductsFiltersOk";

    /**
     * Returns count of products with status OK of the filter form.
     *
     * @returns {HTMLPElement} the p element.
     */
    this.getProductOk = function() {
        return document.querySelector("#" + PRODUCT_OK);
    };

    /**
     * ID of the "Count of products with status STORAGE of the filter form".
     * @constant
     * @type {string}
     */
    var PRODUCT_STORAGE = "jsProductsFiltersStorage";

    /**
     * Returns count of products with status STORAGE of the filter form.
     *
     * @returns {HTMLPElement} the p element.
     */
    this.getProductStorage = function() {
        return document.querySelector("#" + PRODUCT_STORAGE);
    };

    /**
     * ID of the "Count of products with status OUT_OF_STOCK of the filter form".
     * @constant
     * @type {string}
     */
    var PRODUCT_OUT_OF_STOCK = "jsProductsFiltersOutOfStock";

    /**
     * Returns count of products with status OUT_OF_STOCK of the filter form.
     *
     * @returns {HTMLPElement} the p element.
     */
    this.getProductOutOfStock = function() {
        return document.querySelector("#" + PRODUCT_OUT_OF_STOCK);
    };

    /**
     * Count of products of the "filter form" p DOM element.
     * @constant
     * @type {Object}
     */
    var productAmount = document.querySelector("#jsProductsFiltersAmount");

    /**
     * Maximum product rating of the "products table".
     * @constant
     * @type {number}
     */
    var MAX_RATING = 5;

    /**
     * Products table body of the "products table" tbody DOM element.
     * @constant
     * @type {Object}
     */
    var productsTableBody = document.querySelector("#jsProductsTableBody");

    /**
     * Input of the "search stores form" input DOM element.
     * @constant
     * @type {Object}
     */
    var searchFormInput = document.querySelector("#jsSearchFormInput");

    /**
     * Query of the "search stores form".
     * @constant
     * @type {string}
     */
    var searchStoresQuery = "";

    /**
     * Label for finding stores in the form label DOM element.
     * @constant
     * @type {Object}
     */
    var labelSearch = document.querySelector("#jsLabelSearch");

    /**
     * Label for reload stores in the stores list label DOM element.
     * @constant
     * @type {Object}
     */
    var labelReload = document.querySelector("#jsLabelReload");

    /**
     * Label to remove search filtering stores in the stores list label DOM element.
     * @constant
     * @type {Object}
     */
    var labelClose = document.querySelector("#jsCircleClose");

    /**
     * Store search form in the stores list form DOM element.
     * @constant
     * @type {Object}
     */
    var searchForm = document.querySelector("#jsSearchForm");

    /**
     * Wrapper to filter all products in the store details filter div DOM element.
     * @constant
     * @type {Object}
     */
    var productsFilterAll = document.querySelector("#jsProductsFilterTypeAll");

    /**
     * Wrapper to filter products with status OK in the store details filter div DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersOk = document.querySelector("#jsProductsFilterTypeOk");

    /**
     * Wrapper to image for products with status OK in the store details filter figure DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersFigureOk = document.querySelector(
        "#productsFiltersFigureOk"
    );

    /**
     * Image for products with status OK in the store details filter img DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersImageOk = document.querySelector(
        "#productsFiltersOkImg"
    );

    /**
     * Wrapper to filter products with status STORAGE in the store details filter div DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersStorage = document.querySelector(
        "#jsProductsFilterTypeStorage"
    );

    /**
     * Wrapper to image for products with status STORAGE in the store details filter figure DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersFigureStorage = document.querySelector(
        "#productsFiltersFigureStorage"
    );

    /**
     * Image for products with status STORAGE in the store details filter img DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersImageStorage = document.querySelector(
        "#productsFiltersStorageImg"
    );

    /**
     * Wrapper to filter products with status OUT_OF_STOCK in the store details filter div DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersOutOfStock = document.querySelector(
        "#jsProductsFilterTypeOutOfStock"
    );

    /**
     * Wrapper to image for products with status OUT_OF_STOCK in the store details filter figure DOM element.
     * @constant
     * @type {Object}
     */
    var productFiltersFigureOutOfStock = document.querySelector(
        "#productsFiltersFigureOutOfStock"
    );

    /**
     * Image for products with status OUT_OF_STOCK in the store details filter img DOM element.
     * @constant
     * @type {Object}
     */
    var productsFiltersImageOutOfStock = document.querySelector(
        "#productsFiltersOutOfStock"
    );

    /**
     * Button to open form to create new stores button DOM element.
     * @constant
     * @type {Object}
     */
    var createStoreButton = document.querySelector("#jsCreateButton");

    /**
     * Button to delete stores button DOM element.
     * @constant
     * @type {Object}
     */
    var deleteStoreButton = document.querySelector("#jsDeleteButton");

    /**
     * Wrapper for store creation form section DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStore = document.querySelector("#jsModalCreateStore");

    /**
     * Store creation form close button button DOM element.
     * @constant
     * @type {Object}
     */
    var cancelCreateStoreModal = document.querySelector(
        "#jsModalCreateStoreCancelButton"
    );

    /**
     * Input to create a new store name input DOM element.
     * @constant
     * @type {Object}
     */
    var inputValueStoreName = document.querySelector("#jsModalCreateStoreName");

    /**
     * Input to create a new store email input DOM element.
     * @constant
     * @type {Object}
     */
    var inputValueStoreEmail = document.querySelector(
        "#jsModalCreateStoreEmail"
    );

    /**
     * Input to create a new store phone number input DOM element.
     * @constant
     * @type {Object}
     */
    var inputValueStorePhoneNumber = document.querySelector(
        "#jsModalCreateStorePhoneNumber"
    );

    /**
     * Input to create a new store address input DOM element.
     * @constant
     * @type {Object}
     */
    var inputValueStoreAddress = document.querySelector(
        "#jsModalCreateStoreAddress"
    );

    /**
     * Input to create a new store established date input DOM element.
     * @constant
     * @type {Object}
     */
    var inputValueEstablishedDate = document.querySelector(
        "#jsModalCreateEstablishedDate"
    );

    /**
     * Input to create a new store floor area input DOM element.
     * @constant
     * @type {Object}
     */
    var inputValueFloorArea = document.querySelector("#jsModalCreateFloorArea");

    /**
     * Button to create a store and send data to the local server button DOM element.
     * @constant
     * @type {Object}
     */
    var buttonCreateStore = document.querySelector("#jsModalCreateButton");

    /**
     * Form to create a new store form DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStoreForm = document.querySelector(
        "#jsModalCreateStoreForm"
    );

    /**
     * Store deletion confirmation popup section DOM element.
     * @constant
     * @type {Object}
     */
    var confirmationPopup = document.querySelector("#confirmationPopup");

    /**
     * Button to cancel confirmation popup button DOM element.
     * @constant
     * @type {Object}
     */
    var buttonConfirmationPopupCancel = document.querySelector(
        "#jsConfirmationPopupCancel"
    );

    /**
     * Button to confirm confirmation popup button DOM element.
     * @constant
     * @type {Object}
     */
    var buttonConfirmationPopupOk = document.querySelector(
        "#jsConfirmationPopupOk"
    );

    /**
     * regular expression to validate the input of creating an email of a new store.
     * @constant
     * @type {RegExp}
     */
    var EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    /**
     * Label to validate store name creation label DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStoreNameLabel = document.querySelector(
        "#jsModalCreateStoreNameLabel"
    );

    /**
     * Label to validate email creation label DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStoreEmailLabel = document.querySelector(
        "#jsModalCreateStoreEmailLabel"
    );

    /**
     * Label to validate phone number creation label DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStorePhoneNumberLabel = document.querySelector(
        "#jsModalCreateStorePhoneNumberLabel"
    );

    /**
     * Label to validate address creation label DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStoreAddressLabel = document.querySelector(
        "#jsModalCreateStoreAddressLabel"
    );

    /**
     * Label to validate established date creation label DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStoreEstablishedDate = document.querySelector(
        "#jsModalCreateStoreEstablishedDateLabel"
    );

    /**
     * Label to validate floor area creation label DOM element.
     * @constant
     * @type {Object}
     */
    var modalCreateStoreFloorArea = document.querySelector(
        "#jsModalCreateStoreFloorAreaLabel"
    );

    /**
     * Adds a text element with information about the lack of stores
     *
     * @return {View} self object.
     *
     * @public
     */
    this.addEmptyStoreIndicator = function() {
        var notFoundStoresText = document.createElement("p");
        notFoundStoresText.innerText = "Stores not found";
        notFoundStoresText.classList.add("stores-list-not-found");

        this.getStoresListWrapper().innerHTML = "";
        this.getStoresListWrapper().appendChild(notFoundStoresText);

        return this;
    };

    /**
     * Rendering stores into stores list wrapper .
     *
     * @param {Object[]} stores the stores data array.
     *
     * @returns {View} selft object.
     *
     * @public
     */
    this.showStoresList = function(stores) {
        this.getStoresListWrapper().innerHTML = "";

        stores.forEach(item => {
            this.getStoresListWrapper().innerHTML += `
            <li id="js-stores-list__item" class="stores-list__item" data-store-id="${item.id}">
                <div class="store-info">
                    <h4 class="store-info__title" title="${item.Name}">
                        ${item.Name}
                    </h4>
                    <span class="store-info__address">
                        ${item.Address}
                    </span>
                </div>
                <div class="store-square">
                    <span class="store-square__number">${item.FloorArea}</span>
                    <span class="store-square__unit">sq.m</span>
                </div>
            </li>
            `;
        });
    };
}

/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */

function Model() {
    var _API_URL = `http://localhost:3000/api`;

    /**
     * URL template for getting stores from local server.
     * @type {string}
     *
     * @example url: `${API_URL}${STORES_API_URL}`;
     *
     * @private
     */
    var _STORES_API_URL = `/Stores`;

    /**
     * URL template for getting store products from local server.
     * @type {string}
     *
     * @example url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_API_URL}`;
     *
     * @private
     */
    var _REL_PRODUCTS_API_URL = `/rel_Products`;

    /**
     * URL template for getting store products with OK status from local server.
     * @type {string}
     *
     * @example url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_OK_API_URL}`;
     *
     * @private
     */
    var _REL_PRODUCTS_OK_API_URL = `/rel_Products?${encodeURI(
        `filter={"where":{"Status":{"like":"OK"}}}`
    )}`;

    /**
     * URL template for getting store products with STORAGE status from local server.
     * @type {string}
     *
     * @example url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_STORAGE_API_URL}`;
     *
     * @private
     */
    var _REL_PRODUCTS_STORAGE_API_URL = `/rel_Products?${encodeURI(
        `filter={"where":{"Status":{"like":"STORAGE"}}}`
    )}`;

    /**
     * URL template for getting store products with OUT_OF_STOCK status from local server.
     * @type {string}
     *
     * @example url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_OUT_OF_STOCK_API_URL}`;
     *
     * @private
     */
    var _REL_PRODUCTS_OUT_OF_STOCK_API_URL = `/rel_Products?${encodeURI(
        `filter={"where":{"Status":{"like":"OUT_OF_STOCK"}}}`
    )}`;

    /**
     * Common method which "promisifies" the fetch calls.
     *
     * @param {Object} options the URL address and method to fetch.
     *
     * @return {Promise} the promise object will be resolved once fetch gets loaded/failed.
     *
     * @public
     */
    this.getAsyncRequestStores = function(options) {
        return fetch(options.url, {
            method: options.method
        }).then(response => {
            if (response.status < 400) {
                return response.json();
            }
        });
    };

    /**
     * Get stores.
     *
     * @returns {Promise} the promise object will be resolved once the Stores array gets loaded.
     *
     * @public
     */
    this.getStores = function() {
        return this.getAsyncRequestStores({
            method: "GET",
            url: `${_API_URL}${_STORES_API_URL}`
        });
    };

    /**
     * Get filtered stores.
     *
     * @param {string} searchStoresQuery the text entered in the search form input.
     *
     * @returns {Promise} the promise object will be resolved once the filtered stores array gets loaded.
     *
     * @public
     */
    this.getFilteredStores = function(searchStoresQuery) {
        return this.getAsyncRequestStores({
            method: "GET",
            url: `${_API_URL}${_STORES_API_URL}?${encodeURI(
                `filter={"where":{"or":[{"Name":{"regexp":"/${searchStoresQuery}/i"}},{"Address":{"regexp":"/${searchStoresQuery}/i"}}, {"FloorArea":{"like":"/${searchStoresQuery}/i"}}]}}`
            )}`
        });
    };
}

/**
 * Controller class. Orchestrates the model and view objects. A "glue" between them.
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */

function Controller(view, model) {
    /**
     * Initialize controller.
     *
     * @public
     */
    this.init = function() {
        var storesListWrapper = view.getStoresListWrapper();

        storesListWrapper.addEventListener("click", this.onStoreClick);
    };

    /**
     * Store div click event handler.
     *
     * @listens click
     *
     * @param {Event} e the DOM event object.
     *
     * @private
     */
    this._onStoreClick = function(event) {
        view.getMainStoreDetailsWithoutJsDisplayTypeNoneClass();
        view.getNotSelectedStoresWrapperWithJsDisplayTypeNone();

        // var activeStore = event.target.closest("li");
    };

    /**
     * Rendering stores.
     *
     * @param {string} searchQuery the text entered in the search form input.
     *
     * @private
     */
    this._renderStores = (function(searchQuery) {
        var fetchStores = searchQuery
            ? model.getFilteredStores
            : model.getStores;

        fetchStores(searchQuery)
            .then(stores => {
                if (!stores.length) {
                    view.addEmptyStoreIndicator();
                } else {
                    view.showStoresList(stores);
                    _onStoreClick(stores);
                }
            })
            .catch(error => {
                console.log(error.message, error.stack);
            });
    })();
}

new Controller(new View(), new Model()).init();
