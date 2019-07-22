import React, { Component } from "react";
import "./InputForm.css";

export default class InputForm extends Component {
    state = {
        city: null
    };

    postCity = value => {
        this.props.setCity(value);
    };

    startSearch = event => {
        if (event.keyCode === 13) {
            this.setState({ city: event.target.value }, () => {
                this.props.getData(this.state.city);
                this.postCity(this.state.city);
            });
        }
    };

    toggleFavoriteStatus = event => {
        this.props.toggleFavoriteStatus(event.target.value);
    };

    render() {
        return (
            <div className="inputBlock">
                <input
                    type="text"
                    className="input"
                    onKeyDown={this.startSearch}
                />
                <input
                    type="button"
                    value="favorite"
                    className="menuButton"
                    onClick={this.toggleFavoriteStatus}
                />
                <input
                    type="button"
                    value="search"
                    className="menuButton"
                    onClick={this.toggleFavoriteStatus}
                />
            </div>
        );
    }
}
