import { connect } from "react-redux";
import React, { Component } from "react";
import "./InputForm.css";
import { getDataRequest, toggleFavoriteStatus } from "../store/actions";
import { Link } from "react-router-dom";

class InputForm extends Component {
    state = {
        city: "London"
    };

    startSearch = () => {
        this.props.getDataRequest(this.state.city, this.props.url);
    };

    inputOnChange = event => {
        this.setState({ ...this.state, city: event.target.value });
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
                    onChange={this.inputOnChange}
                    value={this.state.city}
                />

                <Link
                    to={{
                        pathname: `/search/${this.state.city}/1`
                    }}
                >
                    <input
                        type="button"
                        value="Gooo"
                        className="menuButton"
                        onClick={this.startSearch}
                    />
                </Link>

                <Link to={{ pathname: "/favorites" }} className="toFavorite">
                    <input
                        type="button"
                        value="favorite"
                        className="menuButton"
                        onClick={this.toggleFavoriteStatus}
                    />
                </Link>
                <Link
                    to={{
                        pathname: `/search/${this.props.city}/${
                            this.props.currentPage
                        }`
                    }}
                    className="toSearch"
                >
                    <input
                        type="button"
                        value="search"
                        className="menuButton"
                        onClick={this.toggleFavoriteStatus}
                    />
                </Link>
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
