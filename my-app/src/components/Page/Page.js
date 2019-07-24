import { connect } from "react-redux";
import React, { Component } from "react";
import "./Page.css";
import { setCurrentPageFrom } from "../store/actions";

class Page extends Component {
    setCurrentPage = () => {
        this.props.setCurrentPageFrom(
            this.props.item,
            this.props.maxPage,
            this.props.city,
            this.props.url
        );
    };

    render() {
        return (
            <div
                item={this.props.item}
                className={
                    this.props.item === this.props.currentPage
                        ? "singlePage selected"
                        : "singlePage"
                }
                onClick={this.setCurrentPage}
            >
                {this.props.item}
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
        setCurrentPageFrom: (currentPage, maxPage, city, url) =>
            dispatch(setCurrentPageFrom(currentPage, maxPage, city, url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page);
