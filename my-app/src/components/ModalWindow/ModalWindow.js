import { connect } from "react-redux";
import React, { Component } from "react";
import "./ModalWindow.css";
import { addToFavorite } from "../store/actions";
import { Link } from "react-router-dom";

class ModalWindow extends Component {
    closeModal = event => {
        if (event.target.className === "modal-container") {
            this.props.toggleModal();
        }
    };

    addToFavorite = () => {
        this.props.addToFavorite(this.props.item);
    };

    render() {
        return (
            <Link
                to={{
                    pathname: `/search/${this.props.city}/${
                        this.props.currentPage
                    }`
                }}
            >
                <div className="modal-container" onClick={this.closeModal}>
                    <div className="modal">
                        <div className="imgBlockModal">
                            <img src={this.props.item.img_url} alt="" />
                        </div>
                        <div className="rooms">
                            <p>BedRooms: {this.props.item.bedroom_number}</p>
                        </div>
                        <div className="baths">
                            <p>BathRooms: {this.props.item.bathroom_number}</p>
                        </div>
                        <div className="valueBlock">
                            <p>{this.props.item.price_formatted}</p>
                        </div>
                        <input
                            type="button"
                            className="add-favorite-button"
                            value="+"
                            onClick={this.addToFavorite}
                        />
                    </div>
                </div>
            </Link>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToFavorite: item => dispatch(addToFavorite(item))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ModalWindow);
