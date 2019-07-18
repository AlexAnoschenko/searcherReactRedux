import React, { Component } from "react";
import "./ModalWindow.css";

export default class ModalWindow extends Component {
    closeModal = event => {
        if (event.target.className === "modal-container") {
            this.props.toggleModal();
        }
    };

    render() {
        return (
            <div className="modal-container" onClick={this.closeModal}>
                <div className="modal">
                    <div className="imgBlock">
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
                </div>
            </div>
        );
    }
}
