"use strict";

const storesListWrapper = document.querySelector("#jsStoresListWrapper");
const mainStoreDetails = document.querySelector("#jsMainStoreDetails");
const notSelectedStoresWrapper = document.querySelector("#jsNotSelectedStores");
const contactDetailsEmail = document.querySelector("#jsContactDetailsEmail");
const contactDetailsNumber = document.querySelector("#jsContactDetailsNumber");
const contactDetailsAddress = document.querySelector(
    "#jsContactDetailsAddress"
);
const contactDetailsEstablishedDate = document.querySelector(
    "#jsContactDetailsEstablishedDate"
);
const contactDetailsFloorArea = document.querySelector(
    "#jsContactDetailsFloorArea"
);
const productsTableSpinner = document.querySelector("#jsProductsTableSpinner");
const productsTable = document.querySelector("#jsProductsTable");
const productOk = document.querySelector("#jsProductsFiltersOk");
const productStorage = document.querySelector("#jsProductsFiltersStorage");
const productOutOfStock = document.querySelector(
    "#jsProductsFiltersOutOfStock"
);
const productAmount = document.querySelector("#jsProductsFiltersAmount");
const MAX_RATING = 5;
const productsTableBody = document.querySelector("#jsProductsTableBody");
const searchFormInput = document.querySelector("#jsSearchFormInput");
let searchStoresQuery = "";
const labelSearch = document.querySelector("#jsLabelSearch");
const labelReload = document.querySelector("#jsLabelReload");
const labelClose = document.querySelector("#jsCircleClose");
const searchForm = document.querySelector("#jsSearchForm");
const productsFilterAll = document.querySelector("#jsProductsFilterTypeAll");
const productsFiltersOk = document.querySelector("#jsProductsFilterTypeOk");
const productsFiltersFigureOk = document.querySelector(
    "#productsFiltersFigureOk"
);
const productsFiltersImageOk = document.querySelector("#productsFiltersOkImg");
const productsFiltersStorage = document.querySelector(
    "#jsProductsFilterTypeStorage"
);
const productsFiltersFigureStorage = document.querySelector(
    "#productsFiltersFigureStorage"
);
const productsFiltersImageStorage = document.querySelector(
    "#productsFiltersStorageImg"
);
const productsFiltersOutOfStock = document.querySelector(
    "#jsProductsFilterTypeOutOfStock"
);
const productFiltersFigureOutOfStock = document.querySelector(
    "#productsFiltersFigureOutOfStock"
);
const productsFiltersImageOutOfStock = document.querySelector(
    "#productsFiltersOutOfStock"
);
const createStoreButton = document.querySelector("#jsCreateButton");
const deleteStoreButton = document.querySelector("#jsDeleteButton");
const modalCreateStore = document.querySelector("#jsModalCreateStore");
const cancelCreateStoreModal = document.querySelector(
    "#jsModalCreateStoreCancelButton"
);
const inputValueStoreName = document.querySelector("#jsModalCreateStoreName");
const inputValueStoreEmail = document.querySelector("#jsModalCreateStoreEmail");
const inputValueStorePhoneNumber = document.querySelector(
    "#jsModalCreateStorePhoneNumber"
);
const inputValueStoreAddress = document.querySelector(
    "#jsModalCreateStoreAddress"
);
const inputValueEstablishedDate = document.querySelector(
    "#jsModalCreateEstablishedDate"
);
const inputValueFloorArea = document.querySelector("#jsModalCreateFloorArea");
const buttonCreateStore = document.querySelector("#jsModalCreateButton");
const modalCreateStoreForm = document.querySelector("#jsModalCreateStoreForm");
const confirmationPopup = document.querySelector("#confirmationPopup");
const buttonConfirmationPopupCancel = document.querySelector(
    "#jsConfirmationPopupCancel"
);
const buttonConfirmationPopupOk = document.querySelector(
    "#jsConfirmationPopupOk"
);
let newStoreName;
let newStoreEmail;
let newStorePhoneNumber;
let newStoreAddress;
let newStoreEstablishedDate;
let newStoreFloorArea;
let objectStoreToPost;

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const modalCreateStoreNameLabel = document.querySelector(
    "#jsModalCreateStoreNameLabel"
);
const modalCreateStoreEmailLabel = document.querySelector(
    "#jsModalCreateStoreEmailLabel"
);
const modalCreateStorePhoneNumberLabel = document.querySelector(
    "#jsModalCreateStorePhoneNumberLabel"
);
const modalCreateStoreAddressLabel = document.querySelector(
    "#jsModalCreateStoreAddressLabel"
);
const modalCreateStoreEstablishedDate = document.querySelector(
    "#jsModalCreateStoreEstablishedDateLabel"
);
const modalCreateStoreFloorArea = document.querySelector(
    "#jsModalCreateStoreFloorAreaLabel"
);

let getAsyncRequestStores = options => {
    return fetch(options.url, {
        method: options.method
    }).then(response => {
        if (response.status < 400) {
            return response.json();
        }
    });
};

let getStores = () => {
    return getAsyncRequestStores({
        method: "GET",
        url: `${API_URL}${STORES_API_URL}`
    });
};

let getFilteredStores = searchStoresQuery => {
    return getAsyncRequestStores({
        method: "GET",
        url: `${API_URL}${STORES_API_URL}?${encodeURI(
            `filter={"where":{"or":[{"Name":{"regexp":"/${searchStoresQuery}/i"}},{"Address":{"regexp":"/${searchStoresQuery}/i"}}, {"FloorArea":{"like":"/${searchStoresQuery}/i"}}]}}`
        )}`
    });
};

let addEmptyStoreIndicator = () => {
    const notFoundStoresText = document.createElement("p");
    notFoundStoresText.innerText = "Stores not found";
    notFoundStoresText.classList.add("stores-list-not-found");

    storesListWrapper.innerHTML = "";
    storesListWrapper.appendChild(notFoundStoresText);
};

let attachStoreClick = stores => {
    storesListWrapper.addEventListener("click", event => {
        mainStoreDetails.classList.remove("js-display-type_none");
        notSelectedStoresWrapper.classList.add("js-display-type_none");

        let activeStore = event.target.closest("li");

        clearActiveClass();
        addActiveClass(activeStore);
        addContactDetails(activeStore, stores);

        renderFilter(activeStore);
        showFilteredProductsStatusAll(activeStore.dataset.storeId);
        showFilteredProductsStatusOk(activeStore.dataset.storeId);
        showFilteredProductsStatusStorage(activeStore.dataset.storeId);
        showFilteredProductsStatusOutOfStock(activeStore.dataset.storeId);

        attachButtonOkConfirmationPopup(activeStore);
    });
};

let showStoresList = stores => {
    storesListWrapper.innerHTML = "";

    stores.forEach(item => {
        storesListWrapper.innerHTML += `
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

let renderStores = searchQuery => {
    const fetchStores = searchQuery ? getFilteredStores : getStores;

    fetchStores(searchQuery)
        .then(stores => {
            if (!stores.length) {
                addEmptyStoreIndicator();
            } else {
                showStoresList(stores);
                attachStoreClick(stores);
            }
        })
        .catch(error => {
            console.log(error.message, error.stack);
        });
};

renderStores();

let clearActiveClass = () => {
    const storeListItems = document.querySelectorAll("#js-stores-list__item");

    storeListItems.forEach(item => {
        item.classList.remove("js-active");
    });
};

let addActiveClass = activeStore => {
    activeStore.classList.add("js-active");
};

let addContactDetails = (activeStore, stores) => {
    stores.forEach(item => {
        let fulldate = new Date(Date.parse(item.Established));
        let month = fulldate.toLocaleString("eng", {
            month: "long"
        });

        let year = fulldate.getFullYear();
        let date = fulldate.getDate();

        if (item.id === Number(activeStore.dataset.storeId)) {
            contactDetailsEmail.innerText = `${item.Email}`;
            contactDetailsNumber.innerText = `${item.PhoneNumber}`;
            contactDetailsAddress.innerText = `${item.Address}`;
            contactDetailsEstablishedDate.innerText = ` ${month} ${date}, ${year}`;
            contactDetailsFloorArea.innerText = `${item.FloorArea}`;
        }
    });
};

let getProducts = (id, status) => {
    switch (status) {
        case OK:
            return getAsyncRequestProducts({
                method: "GET",
                url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_OK_API_URL}`
            });

        case STORAGE:
            return getAsyncRequestProducts({
                method: "GET",
                url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_STORAGE_API_URL}`
            });

        case OUT_OF_STOCK:
            return getAsyncRequestProducts({
                method: "GET",
                url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_OUT_OF_STOCK_API_URL}`
            });

        default:
            return getAsyncRequestProducts({
                method: "GET",
                url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_API_URL}`
            });
    }
};

let getAsyncRequestProducts = options => {
    return fetch(options.url, {
        method: options.method
    }).then(response => {
        if (response.status < 400) {
            productsTableSpinner.classList.add("js-display-type_none");
            productsTable.classList.remove("js-display-type_none");
        }

        return response.json();
    });
};

let renderProducts = (id, status) => {
    const fetchProducts = getProducts;

    fetchProducts(id, status)
        .then(products => {
            addProductsTableAll(products);
        })
        .catch(error => {
            console.log(error.message, error.stack);
        });
};

let getAsyncRequestFilters = options => {
    return fetch(options.url, {
        method: options.method
    }).then(response => {
        if (response.status < 400) {
            productsTableSpinner.classList.add("js-display-type_none");
            productsTable.classList.remove("js-display-type_none");
        }

        return response.json();
    });
};

let getFilters = id => {
    return getAsyncRequestFilters({
        method: "GET",
        url: `${API_URL}${STORES_API_URL}/${id}${REL_PRODUCTS_API_URL}`
    });
};

let renderFilter = activeStore => {
    let id = activeStore.dataset.storeId;
    const fetchFilters = getFilters;

    fetchFilters(id)
        .then(products => {
            addProductsFilters(products);
            addProductsTableAll(products);
        })
        .catch(error => {
            console.log(error.message, error.stack);
        });
};

let addProductsFilters = products => {
    productAmount.innerText = `${products.length}`;

    let okProducts = products.filter(item => {
        return item.Status === OK;
    });

    let storageProducts = products.filter(item => {
        return item.Status === STORAGE;
    });

    let outOfStockProducts = products.filter(item => {
        return item.Status === OUT_OF_STOCK;
    });

    productOk.innerText = `${okProducts.length}`;
    productStorage.innerText = `${storageProducts.length}`;
    productOutOfStock.innerText = `${outOfStockProducts.length}`;
};

let addProductTableName = (firstCols, item) => {
    const paragraphNameProduct = document.createElement("p");

    paragraphNameProduct.innerHTML = `${item.Name}`;

    firstCols.appendChild(paragraphNameProduct);

    paragraphNameProduct.classList.add("products-table__text_type-bold");
};

let addProductTablePrice = (secondCols, item) => {
    const spanPrice = document.createElement("span");
    const spanСurrency = document.createElement("span");

    spanPrice.innerHTML = `${item.Price}`;
    spanСurrency.innerHTML = `USD`;

    secondCols.appendChild(spanPrice);
    secondCols.appendChild(spanСurrency);

    spanPrice.classList.add("products-table__text_big-number");
};

let addProductTableSpecs = (thirdCols, item) => {
    const paragraphSpecs = document.createElement("p");
    paragraphSpecs.title = `${item.Specs}`;
    paragraphSpecs.innerHTML = `${item.Specs}`;

    thirdCols.appendChild(paragraphSpecs);

    paragraphSpecs.classList.add("text-hidden");
};

let addProductTableSupplierInfo = (fourthCols, item) => {
    const paragraphSupplierInfo = document.createElement("p");
    paragraphSupplierInfo.title = `${item.SupplierInfo}`;
    paragraphSupplierInfo.innerHTML = `${item.SupplierInfo}`;

    fourthCols.appendChild(paragraphSupplierInfo);

    paragraphSupplierInfo.classList.add("text-hidden");
};

let addProductTableProductionCompanyName = (sixthCols, item) => {
    const paragraphProductionCompanyName = document.createElement("p");
    paragraphProductionCompanyName.title = `${item.ProductionCompanyName}`;
    paragraphProductionCompanyName.innerHTML = `${item.ProductionCompanyName}`;

    sixthCols.appendChild(paragraphProductionCompanyName);

    paragraphProductionCompanyName.classList.add("text-hidden");
};

let addProductTableRating = (seventhCols, rating) => {
    const figureRating = document.createElement("figure");

    seventhCols.appendChild(figureRating);
    figureRating.classList.add("products-table__rating");

    figureRating.append(...createRating(rating));
};

let createRating = rating => {
    const ratingList = new Array(MAX_RATING).fill();

    return ratingList.map((item, index) => {
        const starImage = document.createElement("img");
        starImage.alt = "products table rating";
        starImage.src =
            rating >= index ? "./images/filled-star.svg" : "./images/star.svg";
        starImage.classList.add("products-table__rating-star");

        return starImage;
    });
};

let addProductTableDetails = eighthColls => {
    const figureDetails = document.createElement("figure");
    const imageDetails = document.createElement("img");

    imageDetails.src = "./images/arrow.svg";
    imageDetails.alt = "products-table-details";

    eighthColls.appendChild(figureDetails).append(imageDetails);

    figureDetails.classList.add("products-table__details");
    imageDetails.classList.add("products-table__details-item");
};

let addProductsTableAll = products => {
    productsTableBody.innerHTML = "";

    products.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td class="products-table__text first-cell td-style js-first-col"></td>
        <td align="right" class="products-table__text td-style js-second-col"></td>
        <td class="products-table__text text-hidden td-style js-third-col" nowrap></td>
        <td class="products-table__text text-hidden td-style js-fourth-col" nowrap></td>
        <td class="products-table__text td-style">${item.MadeIn}</td>
        <td class="products-table__text text-hidden td-style js-sixth-col" nowrap></td>
        <td class="td-style js-seventh-col"></td>
        <td class="products-table__text td-style js-eighth-col"></td>
        `;

        productsTableBody.appendChild(row);
        row.classList.add("products-table__body_row-hover", "tr-style");

        const firstCols = row.querySelector(".js-first-col");
        addProductTableName(firstCols, item);
        const secondCols = row.querySelector(".js-second-col");
        addProductTablePrice(secondCols, item);
        const thirdCols = row.querySelector(".js-third-col");
        addProductTableSpecs(thirdCols, item);
        const fourthCols = row.querySelector(".js-fourth-col");
        addProductTableSupplierInfo(fourthCols, item);
        const sixthCols = row.querySelector(".js-sixth-col");
        addProductTableProductionCompanyName(sixthCols, item);
        const seventhCol = row.querySelector(".js-seventh-col");
        addProductTableRating(seventhCol, item.Rating);
        const eighthColls = row.querySelector(".js-eighth-col");
        addProductTableDetails(eighthColls);
    });
};

let attachStoresFieldInput = () => {
    searchFormInput.addEventListener("input", event => {
        searchStoresQuery = event.target.value;
    });
};

let attachStoresSearch = () => {
    labelSearch.addEventListener("click", event => {
        event.preventDefault();

        labelReload.classList.add("js-display-type_none");
        labelClose.classList.remove("js-display-type_none");

        renderStores(searchStoresQuery);
    });
};
let attachStoresReset = () => {
    labelClose.addEventListener("click", event => {
        event.preventDefault();

        labelReload.classList.remove("js-display-type_none");
        labelClose.classList.add("js-display-type_none");

        searchForm.reset();

        renderStores();
    });
};

let showFilteredProductsStatusAll = activeStoreId => {
    productsFilterAll.addEventListener("click", () => {
        productsFilterAll.classList.add("item-checked");

        productsFiltersOk.classList.remove("item-checked");
        productsFiltersFigureOk.classList.remove("background-checked-ok");
        productsFiltersImageOk.src = "./images/filter-ok.svg";

        productsFiltersStorage.classList.remove("item-checked");
        productsFiltersFigureStorage.classList.remove(
            "background-checked-storage"
        );
        productsFiltersImageStorage.src = "./images/out-of-storage.svg";

        productsFiltersOutOfStock.classList.remove("item-checked");
        productFiltersFigureOutOfStock.classList.remove(
            "background-checked-out-of-stock"
        );
        productsFiltersImageOutOfStock.src = "./images/out-of-stock.svg";

        renderProducts(activeStoreId);
    });
};

let showFilteredProductsStatusOk = activeStoreId => {
    productsFiltersOk.addEventListener("click", () => {
        productsFiltersOk.classList.add("item-checked");
        productsFiltersFigureOk.classList.add("background-checked-ok");
        productsFiltersImageOk.src = "./images/filter-ok-white.svg";

        productsFilterAll.classList.remove("item-checked");

        productsFiltersStorage.classList.remove("item-checked");
        productsFiltersFigureStorage.classList.remove(
            "background-checked-storage"
        );
        productsFiltersImageStorage.src = "./images/out-of-storage.svg";

        productsFiltersOutOfStock.classList.remove("item-checked");
        productFiltersFigureOutOfStock.classList.remove(
            "background-checked-out-of-stock"
        );
        productsFiltersImageOutOfStock.src = "./images/out-of-stock.svg";

        renderProducts(activeStoreId, OK);
    });
};

let showFilteredProductsStatusStorage = activeStoreId => {
    productsFiltersStorage.addEventListener("click", () => {
        productsFiltersStorage.classList.add("item-checked");
        productsFiltersFigureStorage.classList.add(
            "background-checked-storage"
        );
        productsFiltersImageStorage.src = "./images/out-of-storage-white.svg";

        productsFilterAll.classList.remove("item-checked");

        productsFiltersOk.classList.remove("item-checked");
        productsFiltersFigureOk.classList.remove("background-checked-ok");
        productsFiltersImageOk.src = "./images/filter-ok.svg";

        productsFiltersOutOfStock.classList.remove("item-checked");
        productFiltersFigureOutOfStock.classList.remove(
            "background-checked-out-of-stock"
        );
        productsFiltersImageOutOfStock.src = "./images/out-of-stock.svg";

        renderProducts(activeStoreId, STORAGE);
    });
};

let showFilteredProductsStatusOutOfStock = activeStoreId => {
    productsFiltersOutOfStock.addEventListener("click", () => {
        productsFiltersOutOfStock.classList.add("item-checked");
        productFiltersFigureOutOfStock.classList.add(
            "background-checked-out-of-stock"
        );
        productsFiltersImageOutOfStock.src = "./images/out-of-stock-white.svg";

        productsFilterAll.classList.remove("item-checked");

        productsFiltersOk.classList.remove("item-checked");
        productsFiltersFigureOk.classList.remove("background-checked-ok");
        productsFiltersImageOk.src = "./images/filter-ok.svg";

        productsFiltersStorage.classList.remove("item-checked");
        productsFiltersFigureStorage.classList.remove(
            "background-checked-storage"
        );
        productsFiltersImageStorage.src = "./images/out-of-storage.svg";

        renderProducts(activeStoreId, OUT_OF_STOCK);
    });
};

function CreateNewStore(
    newStoreName,
    newStoreEmail,
    newStorePhoneNumber,
    newStoreAddress,
    newStoreEstablishedDate,
    newStoreFloorArea
) {
    this.Name = newStoreName;
    this.Email = newStoreEmail;
    this.PhoneNumber = newStorePhoneNumber;
    this.Address = newStoreAddress;
    this.Established = newStoreEstablishedDate;
    this.FloorArea = newStoreFloorArea;
}

let attachButtonCreateStoreModal = () => {
    createStoreButton.addEventListener("click", () => {
        modalCreateStore.classList.remove("js-display-type_none");
    });
};

let attachButtonDeleteStoreModal = () => {
    deleteStoreButton.addEventListener("click", () => {
        confirmationPopup.classList.remove("js-display-type_none");
    });
};

let attachButtonCloseStoreModal = () => {
    cancelCreateStoreModal.addEventListener("click", () => {
        modalCreateStore.classList.add("js-display-type_none");
        resetModalCreateNewStore();

        modalCreateStoreNameLabel.dataset.validationMessage = "";
        modalCreateStoreEmailLabel.dataset.validationMessage = "";
        modalCreateStorePhoneNumberLabel.dataset.validationMessage = "";
        modalCreateStoreAddressLabel.dataset.validationMessage = "";
        modalCreateStoreEstablishedDate.dataset.validationMessage = "";
        modalCreateStoreFloorArea.dataset.validationMessage = "";

        removeAllValidationClasses(inputValueStoreName);
        removeAllValidationClasses(inputValueStoreEmail);
        removeAllValidationClasses(inputValueStorePhoneNumber);
        removeAllValidationClasses(inputValueStoreAddress);
        removeAllValidationClasses(inputValueEstablishedDate);
        removeAllValidationClasses(inputValueFloorArea);
    });
};

let attachButtonCancelConfirmationPopup = () => {
    buttonConfirmationPopupCancel.addEventListener("click", () => {
        confirmationPopup.classList.add("js-display-type_none");
    });
};

let attachCreatStoreFieldInput = () => {
    inputValueStoreName.addEventListener("input", event => {
        newStoreName = event.target.value;
    });
    inputValueStoreEmail.addEventListener("input", event => {
        newStoreEmail = event.target.value;
    });
    inputValueStorePhoneNumber.addEventListener("input", event => {
        newStorePhoneNumber = event.target.value;
    });
    inputValueStoreAddress.addEventListener("input", event => {
        newStoreAddress = event.target.value;
    });
    inputValueEstablishedDate.addEventListener("input", event => {
        newStoreEstablishedDate = event.target.value;
    });
    inputValueFloorArea.addEventListener("input", event => {
        newStoreFloorArea = event.target.value;
    });
};

let resetModalCreateNewStore = () => {
    modalCreateStoreForm.reset();
};

let postAsyncRequest = options => {
    fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: options.body
    });
};

let deleteAsyncRequest = options => {
    fetch(options.url, {
        method: options.method
    });
};

let postNewStore = object => {
    postAsyncRequest({
        method: "POST",
        url: `${API_URL}${STORES_API_URL}`,
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(object)
    });
};

let deleteStore = id => {
    deleteAsyncRequest({
        method: "DELETE",
        url: `${API_URL}${STORES_API_URL}/${id}`
    });
};

function EmptyNameError(message) {
    if (Error.hasOwnProperty("captureStackTrace")) {
        Error.captureStackTrace(this, this.constructor);
    }

    this.Name = "EmptyNameError";
    this.message = message;
}

function InvalidInputEmail(message) {
    if (Error.hasOwnProperty("captureStackTrace")) {
        Error.captureStackTrace(this, this.constructor);
    }

    this.Name = "InvalidInputEmail";
    this.message = message;
}

function InvalidInputPhoneNumber(message) {
    if (Error.hasOwnProperty("captureStackTrace")) {
        Error.captureStackTrace(this, this.constructor);
    }

    this.Name = "InvalidInputPhoneNumber";
    this.message = message;
}

function EmptyAddressError(message) {
    if (Error.hasOwnProperty("captureStackTrace")) {
        Error.captureStackTrace(this, this.constructor);
    }

    this.Name = "EmptyAddressError";
    this.message = message;
}

function EmptyEstablishedDate(message) {
    if (Error.hasOwnProperty("captureStackTrace")) {
        Error.captureStackTrace(this, this.constructor);
    }

    this.Name = "EmptyEstablishedDate";
    this.message = message;
}

function InvalidInputFloorArea(message) {
    if (Error.hasOwnProperty("captureStackTrace")) {
        Error.captureStackTrace(this, this.constructor);
    }

    this.Name = "InvalidInputFloorArea";
    this.message = message;
}

let validateEmail = value => {
    return EMAIL_REGEXP.test(value);
};

let removeAllValidationClasses = element => {
    element.classList.remove("validation-error");
    element.classList.remove("validation-success");
};

let attachButtonCreateStore = () => {
    buttonCreateStore.addEventListener("click", () => {
        try {
            if (newStoreName === undefined) {
                throw new EmptyNameError(
                    "This field is required. Please enter a name."
                );
            } else {
                inputValueStoreName.classList.add("validation-success");
                modalCreateStoreNameLabel.dataset.validationMessage = "";
            }

            if (!validateEmail(newStoreEmail)) {
                throw new InvalidInputEmail(
                    "The email field is entered incorrectly. Please enter the format ****@*****.com or .ru"
                );
            } else {
                inputValueStoreEmail.classList.add("validation-success");
                modalCreateStoreEmailLabel.dataset.validationMessage = "";
            }

            if (isNaN(newStorePhoneNumber)) {
                throw new InvalidInputPhoneNumber(
                    "The phone number field is entered incorrectly. Please enter a value in numeric format."
                );
            } else {
                inputValueStorePhoneNumber.classList.add("validation-success");
                modalCreateStorePhoneNumberLabel.dataset.validationMessage = "";
            }

            if (newStoreAddress === undefined) {
                throw new EmptyAddressError(
                    "This field is required. Please enter an address."
                );
            } else {
                inputValueStoreAddress.classList.add("validation-success");
                modalCreateStoreAddressLabel.dataset.validationMessage = "";
            }

            if (newStoreEstablishedDate === undefined) {
                throw new EmptyEstablishedDate(
                    "This field is required. Please enter an established date."
                );
            } else {
                inputValueEstablishedDate.classList.add("validation-success");
                modalCreateStoreEstablishedDate.dataset.validationMessage = "";
            }
            if (isNaN(newStoreFloorArea)) {
                throw new InvalidInputFloorArea(
                    "The floor area field is entered incorrectly. Please enter a value in numeric format."
                );
            } else {
                inputValueFloorArea.classList.add("validation-success");
                modalCreateStoreFloorArea.dataset.validationMessage = "";
            }

            objectStoreToPost = new CreateNewStore(
                newStoreName,
                newStoreEmail,
                newStorePhoneNumber,
                newStoreAddress,
                newStoreEstablishedDate,
                newStoreFloorArea
            );

            postNewStore(objectStoreToPost);
            renderStores();

            resetModalCreateNewStore();
            modalCreateStoreNameLabel.dataset.validationMessage = "";
            modalCreateStoreEmailLabel.dataset.validationMessage = "";
            modalCreateStorePhoneNumberLabel.dataset.validationMessage = "";
            modalCreateStoreAddressLabel.dataset.validationMessage = "";
            modalCreateStoreEstablishedDate.dataset.validationMessage = "";
            modalCreateStoreFloorArea.dataset.validationMessage = "";

            removeAllValidationClasses(inputValueStoreName);
            removeAllValidationClasses(inputValueStoreEmail);
            removeAllValidationClasses(inputValueStorePhoneNumber);
            removeAllValidationClasses(inputValueStoreAddress);
            removeAllValidationClasses(inputValueEstablishedDate);
            removeAllValidationClasses(inputValueFloorArea);

            modalCreateStore.classList.add("js-display-type_none");
        } catch (error) {
            if (error instanceof EmptyNameError) {
                modalCreateStoreNameLabel.dataset.validationMessage =
                    error.message;

                inputValueStoreName.classList.remove("validation-success");
                inputValueStoreName.classList.add("validation-error");
            }
            if (error instanceof InvalidInputEmail) {
                modalCreateStoreEmailLabel.dataset.validationMessage =
                    error.message;

                inputValueStoreEmail.classList.remove("validation-success");
                inputValueStoreEmail.classList.add("validation-error");
            }
            if (error instanceof InvalidInputPhoneNumber) {
                modalCreateStorePhoneNumberLabel.dataset.validationMessage =
                    error.message;

                inputValueStorePhoneNumber.classList.remove(
                    "validation-success"
                );
                inputValueStorePhoneNumber.classList.add("validation-error");
            }

            if (error instanceof EmptyAddressError) {
                modalCreateStoreAddressLabel.dataset.validationMessage =
                    error.message;

                inputValueStoreAddress.classList.remove("validation-success");
                inputValueStoreAddress.classList.add("validation-error");
            }

            if (error instanceof EmptyEstablishedDate) {
                modalCreateStoreEstablishedDate.dataset.validationMessage =
                    error.message;

                inputValueEstablishedDate.classList.remove(
                    "validation-success"
                );
                inputValueEstablishedDate.classList.add("validation-error");
            }

            if (error instanceof InvalidInputFloorArea) {
                modalCreateStoreFloorArea.dataset.validationMessage =
                    error.message;

                inputValueFloorArea.classList.remove("validation-success");
                inputValueFloorArea.classList.add("validation-error");
            }

            console.error(error.message, error.stack);
        }
    });
};

let attachButtonOkConfirmationPopup = activeStore => {
    let id = activeStore.dataset.storeId;

    buttonConfirmationPopupOk.addEventListener("click", () => {
        deleteStore(id);
        renderStores();
        confirmationPopup.classList.add("js-display-type_none");
    });
};

let attachEvents = () => {
    attachStoresFieldInput();
    attachStoresSearch();
    attachStoresReset();

    attachButtonCreateStoreModal();
    attachButtonCloseStoreModal();

    attachButtonDeleteStoreModal();
    attachButtonCancelConfirmationPopup();

    attachCreatStoreFieldInput();
    attachButtonCreateStore();
};

attachEvents();
