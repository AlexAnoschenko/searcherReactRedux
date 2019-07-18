//import { connect } from "react-redux";

import React, { Component } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import Items from "./components/Items/Items";
import ModalWindow from "./components/ModalWindow/ModalWindow";

export default class App extends Component {
    state = {
        items: [],
        url:
            "https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name=",
        modalItem: null,
        modalStatus: false,
        favorites: [],
        pageStatus: "search"
    };

    setModalItem = value => {
        this.setState({ modalItem: value }, this.toggleModal());
    };

    toggleModal = () => {
        this.setState(state => ({ modalStatus: !state.modalStatus }));
    };

    getData = city => {
        return fetch(this.state.url + city)
            .then(responce => {
                return responce.json();
            })
            .then(listing => {
                this.setState({ items: listing.response.listings });
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

    render() {
        return (
            <React.Fragment>
                <InputForm
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
            </React.Fragment>
        );
    }
}
