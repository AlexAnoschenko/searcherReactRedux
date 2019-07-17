//import { connect } from "react-redux";

import React, { Component } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import Items from "./components/Items/Items";

export default class App extends Component {
    state = {
        items: [],
        url:
            "https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name="
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

    render() {
        return (
            <React.Fragment>
                <InputForm getData={this.getData} />
                <Items items={this.state.items} />
            </React.Fragment>
        );
    }
}
