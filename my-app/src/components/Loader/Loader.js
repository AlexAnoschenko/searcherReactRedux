import { connect } from "react-redux";
import React, { Component } from "react";
import "./Loader.css";
import { loader } from "../store/actions";

class Loader extends Component {
    loaderData = () => {
        this.props.loader(
            this.props.currentPage,
            this.props.maxPage,
            this.props.city,
            this.props.url
        );
    };

    render() {
        return (
            <div>
                <center>
                    <input
                        type="button"
                        className="load-button"
                        value="Load..."
                        onClick={this.loaderData}
                    />
                </center>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        pages: store.pages,
        currentPage: store.currentPage,
        maxPage: store.maxPage,
        city: store.city,
        url: store.url
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loader: (currentPage, maxPage, city, url) =>
            dispatch(loader(currentPage, maxPage, city, url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loader);
