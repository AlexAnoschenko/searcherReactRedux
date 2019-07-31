import { connect } from "react-redux";
import React, { Component } from "react";
import "./Pagination.css";
import Page from "../Page/Page";
import { setEdgePage } from "../store/actions";

class Pagination extends Component {
    renderPage = () => {
        return this.props.pages.map((item, i) => {
            return <Page item={item} key={i} />;
        });
    };

    edgePage = event => {
        if (event.target.className === "firstPage") {
            this.props.setEdgePage(1, this.props.city, this.props.url);
        } else if (event.target.className === "lastPage") {
            this.props.setEdgePage(
                this.props.maxPage,
                this.props.city,
                this.props.url,
                this.props.maxPage
            );
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
        setEdgePage: (page, city, url, maxPage) =>
            dispatch(setEdgePage(page, city, url, maxPage))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);
