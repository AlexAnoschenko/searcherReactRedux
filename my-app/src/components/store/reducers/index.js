export const initialState = {
    items: [],
    url:
        "https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name=",
    modalItem: null,
    favorites: [],
    pageStatus: "search",
    maxPage: null,
    currentPage: null,
    pages: [],
    city: null,
    loadSelector: false
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DATA_SUCCESS":
            return {
                ...state,
                items: action.payload.items,
                city: action.payload.city,
                currentPage:
                    state.currentPage === null ? 1 : action.payload.page,
                maxPage: action.payload.maxPage,
                pages: action.payload.pages
            };

        case "SET_CURRENT_PAGE_FROM":
            return {
                ...state,
                items: action.payload.items,
                currentPage: action.payload.currentPage,
                pages: action.payload.pages
            };

        case "SET_PAGINATE":
            return {
                ...state,
                pages: action.payload
            };

        case "SET_EDGE_PAGE":
            return {
                ...state,
                items: action.payload.items,
                currentPage: action.payload.currentPage,
                pages: action.payload.pages
            };

        case "ADD_TO_FAVORITE":
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };

        case "TOGGLE_FAVORITE_STATUS":
            return {
                ...state,
                pageStatus: action.payload
            };

        case "LOADER":
            return {
                ...state,
                items: [...state.items, ...action.payload.items],
                currentPage: action.payload.currentPage,
                pages: action.payload.pages
            };

        case "CHANGE_LOADING_ON_CLICK":
            return {
                ...state,
                loadSelector: !state.loadSelector
            };

        default:
            return state;
    }
}
