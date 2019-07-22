//import { connect } from "react-redux";

import React, { Component } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import Items from "./components/Items/Items";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import Pagination from "./components/Pagination/Pagination";
import Loader from "./components/Loader/Loader";

export default class App extends Component {
    state = {
        items: [],
        url:
            "https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name=",
        modalItem: null,
        modalStatus: false,
        favorites: [],
        pageStatus: "search",
        maxPage: null,
        currentPage: null,
        pages: [],
        city: null,
        loadSelector: false
    };

    setCity = value => {
        this.setState({ city: value });
    };

    setPages = () => {
        const { maxPage, currentPage } = this.state;
        switch (this.state.currentPage) {
            case 1:
            case 2:
            case 3:
                this.setState({ pages: [1, 2, 3, 4, 5] });
                break;
            case maxPage:
            case maxPage - 1:
            case maxPage - 2:
                this.setState({
                    pages: [
                        maxPage - 4,
                        maxPage - 3,
                        maxPage - 2,
                        maxPage - 1,
                        maxPage
                    ]
                });
                break;
            default:
                this.setState({
                    pages: [
                        currentPage - 2,
                        currentPage - 1,
                        currentPage,
                        currentPage + 1,
                        currentPage + 2
                    ]
                });
                break;
        }
    };

    setCurrentPage = value => {
        this.setState({ currentPage: value }, () =>
            this.getData(this.state.city)
        );
    };

    setModalItem = value => {
        this.setState({ modalItem: value }, this.toggleModal);
    };

    toggleModal = () => {
        this.setState(state => ({ modalStatus: !state.modalStatus }));
    };

    getPage = () => {
        if (this.state.currentPage === null) {
            return "";
        } else {
            return "&page=" + this.state.currentPage;
        }
    };

    getData = city => {
        fetch(this.state.url + city + this.getPage())
            .then(responce => {
                return responce.json();
            })
            .then(listing => {
                this.setState(
                    {
                        items: listing.response.listings,
                        maxPage:
                            listing.response.total_pages > 50
                                ? 50
                                : listing.response.total_pages,
                        currentPage:
                            this.state.currentPage === null
                                ? 1
                                : this.state.currentPage
                    },
                    this.setPages
                );
            });
    };

    addToFavorite = item => {
        this.setState(state => ({
            favorites: [...state.favorites, item]
        }));
    };

    toggleFavoriteStatus = value => {
        this.setState({ pageStatus: value });
    };

    getItems = () => {
        if (this.state.pageStatus === "search") {
            return this.state.items;
        } else if (this.state.pageStatus === "favorite") {
            return this.state.favorites;
        } else {
            return [];
        }
    };

    loader = () => {
        if (this.state.currentPage < this.state.maxPage) {
            return fetch(
                this.state.url +
                    this.state.city +
                    "&page=" +
                    this.state.currentPage +
                    1
            )
                .then(responce => {
                    return responce.json();
                })
                .then(listing => {
                    this.setState(state => ({
                        currentPage: state.currentPage + 1,
                        items: [...state.items, ...listing.response.listings]
                    }));
                    this.setPages();
                });
        }
    };

    setLoading = () => {
        if (
            this.state.currentPage !== null &&
            this.state.loadSelector === false
        ) {
            return (
                <Pagination
                    setCurrentPage={this.setCurrentPage}
                    currentPage={this.state.currentPage}
                    pages={this.state.pages}
                    maxPage={this.state.maxPage}
                />
            );
        } else if (
            this.state.currentPage !== null &&
            this.state.loadSelector === true
        ) {
            return <Loader className="loader" loader={this.loader} />;
        } else {
            return null;
        }
    };

    changeLoadingOnClick = () => {
        this.setState(state => ({
            loadSelector: !state.loadSelector
        }));
    };

    render() {
        return (
            <React.Fragment>
                <InputForm
                    setCity={this.setCity}
                    getData={this.getData}
                    toggleFavoriteStatus={this.toggleFavoriteStatus}
                />
                <Items
                    items={this.getItems()}
                    setModalItem={this.setModalItem}
                />
                {this.state.modalStatus && (
                    <ModalWindow
                        item={this.state.modalItem}
                        toggleModal={this.toggleModal}
                        addToFavorite={this.addToFavorite}
                    />
                )}
                {this.setLoading()}
                {this.state.currentPage !== null ? (
                    <center>
                        <div>
                            <input
                                type="button"
                                value="Change type of load content..."
                                onClick={this.changeLoadingOnClick}
                            />
                        </div>
                    </center>
                ) : null}
            </React.Fragment>
        );
    }
}
