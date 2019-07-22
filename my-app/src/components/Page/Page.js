import React, { Component } from "react";
import "./Page.css";

export default class Page extends Component {
    setCurrentPage = () => {
        this.props.setCurrentPage(this.props.item);
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
