export function getDataRequest(city, url) {
    return dispatch => {
        fetch(url + city)
            .then(responce => {
                return responce.json();
            })
            .then(listing => {
                dispatch({
                    type: "GET_DATA_SUCCESS",
                    payload: {
                        maxPage:
                            listing.response.total_pages > 50
                                ? 50
                                : listing.response.total_pages,
                        items: listing.response.listings,
                        city: city,
                        pages: setPages(1)
                    }
                });
            });
    };
}

export function setCurrentPageFrom(currentPage, maxPage, city, url) {
    return dispatch => {
        fetch(url + city + getPage(currentPage))
            .then(responce => {
                return responce.json();
            })
            .then(listing => {
                dispatch({
                    type: "SET_CURRENT_PAGE_FROM",
                    payload: {
                        items: listing.response.listings,
                        currentPage: currentPage,
                        pages: setPages(currentPage, maxPage)
                    }
                });
            });
    };
}

export function setEdgePage(page, city, url, maxPage) {
    return dispatch => {
        fetch(url + city + "&page=" + page)
            .then(responce => {
                return responce.json();
            })
            .then(listing => {
                dispatch({
                    type: "SET_EDGE_PAGE",
                    payload: {
                        items: listing.response.listings,
                        currentPage: page,
                        pages: setPages(page, maxPage)
                    }
                });
            });
    };
}

export function addToFavorite(item) {
    return {
        type: "ADD_TO_FAVORITE",
        payload: item
    };
}

export function toggleFavoriteStatus(value) {
    return {
        type: "TOGGLE_FAVORITE_STATUS",
        payload: value
    };
}

export function loader(currentPage, maxPage, city, url) {
    return dispatch => {
        fetch(url + city + "&page=" + ++currentPage)
            .then(responce => {
                return responce.json();
            })
            .then(listing => {
                dispatch({
                    type: "LOADER",
                    payload: {
                        items: listing.response.listings,
                        currentPage: currentPage,
                        pages: setPages(currentPage, maxPage)
                    }
                });
            });
    };
}

export function changeLoadingOnClick() {
    return {
        type: "CHANGE_LOADING_ON_CLICK"
    };
}

const getPage = currentPage => {
    if (currentPage === null) {
        return "";
    } else {
        return "&page=" + currentPage;
    }
};

const setPages = (currentPage, maxPage) => {
    switch (currentPage) {
        case 1:
        case 2:
        case 3:
            return [1, 2, 3, 4, 5];
        case maxPage:
        case maxPage - 1:
        case maxPage - 2:
            return [
                maxPage - 4,
                maxPage - 3,
                maxPage - 2,
                maxPage - 1,
                maxPage
            ];
        default:
            return [
                currentPage - 2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                currentPage + 2
            ];
    }
};
