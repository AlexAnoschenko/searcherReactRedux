import { connect } from "react-redux";
import React, { Component } from "react";
import "./InputForm.css";
import { getDataRequest, toggleFavoriteStatus } from "../store/actions";

class InputForm extends Component {
    startSearch = event => {
        if (event.keyCode === 13) {
            this.props.getDataRequest(event.target.value, this.props.url);
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

const mapStateToProps = store => {
    return {
        city: store.city,
        currentPage: store.currentPage,
        maxPage: store.maxPage,
        url: store.url
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataRequest: (city, url) => dispatch(getDataRequest(city, url)),
        toggleFavoriteStatus: value => dispatch(toggleFavoriteStatus(value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputForm);
