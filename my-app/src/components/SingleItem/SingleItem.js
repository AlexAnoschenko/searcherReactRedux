import React, { Component } from "react";
import "./SingleItem.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SingleItem extends Component {
    toggleModal = () => {
        this.props.setModalItem(this.props.item);
    };

    render() {
        return (
            <Link
                className="linkClass"
                to={{
                    pathname: `/search/${this.props.city}/${
                        this.props.currentPage
                    }/${this.props.itemId}`
                }}
            >
                <div className="singleItem" onClick={this.toggleModal}>
                    <div className="imgBlock">
                        <img src={this.props.item.img_url} alt="" />
                    </div>
                    <div className="textBlock">
                        <span>
                            <b>{this.props.item.title}</b>
                        </span>

                        <span className="summary">
                            {this.props.item.summary}
                        </span>

                        <span className="keywords">
                            {this.props.item.keywords}
                        </span>
                    </div>
                    <div className="valueBlock">
                        <p>{this.props.item.price_formatted}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = store => {
    return {
        city: store.city,
        currentPage: store.currentPage
    };
};

export default connect(mapStateToProps)(SingleItem);
