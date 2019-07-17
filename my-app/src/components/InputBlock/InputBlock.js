import React, { Component } from "react";
import "./InputBlock.css";

export default class InputBlock extends Component {
    state = {
        city: null,
        url:
            "https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=buy&place_name="
    };

    startSearch = event => {
        if (event.keyCode === 13) {
            this.setState({ city: event.target.value }, this.getData);
        }
    };

    getData = () => {
        return fetch(this.state.url + this.state.city)
            .then(responce => {
                return responce.json();
            })
            .then(listing => {
                this.props.setItems(listing.response.listings);
            });
    };

    render() {
        return (
            <div className="inputBlock">
                <input
                    type="text"
                    className="input"
                    onKeyDown={this.startSearch}
                />
                <input type="button" value="favorite" className="menuButton" />
                <input type="button" value="search" className="menuButton" />
            </div>
        );
    }
}
