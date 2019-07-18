import React, { Component } from "react";
import "./SingleItem.css";

export default class SingleItem extends Component {
    toggleModal = () => {
        this.props.setModalItem(this.props.item);
    };

    render() {
        return (
            <div className="singleItem" onClick={this.toggleModal}>
                <div className="imgBlock">
                    <img src={this.props.item.img_url} alt="" />
                </div>
                <div className="textBlock">
                    <p>{this.props.item.summary}</p>
                </div>
                <div className="valueBlock">
                    <p>{this.props.item.price_formatted}</p>
                </div>
            </div>
        );
    }
}
