import React, { Component } from "react";
import "./Pagination.css";
import Page from "../Page/Page";

export default class Pagination extends Component {
    // state = {
    //     firstSelected: false,
    //     lastSelected: false,
    //     pageSelected: false
    // };

    renderPage = () => {
        return this.props.pages.map((item, i) => {
            return (
                <Page
                    item={item}
                    key={i}
                    setCurrentPage={this.props.setCurrentPage}
                    currentPage={this.props.currentPage}
                />
            );
        });
    };

    edgePage = event => {
        if (event.target.className === "firstPage") {
            this.props.setCurrentPage(1);
        } else if (event.target.className === "lastPage") {
            this.props.setCurrentPage(this.props.maxPage);
        }
    };

    render() {
        return (
            <div className="pagination">
                <p
                    className={
                        this.props.currentPage === 1
                            ? "firstPage selected"
                            : "firstPage"
                    }
                    onClick={this.edgePage}
                >
                    start
                </p>
                {this.renderPage()}
                <p
                    className={
                        this.props.currentPage === this.props.maxPage
                            ? "lastPage selected"
                            : "lastPage"
                    }
                    onClick={this.edgePage}
                >
                    end
                </p>
            </div>
        );
    }
}
