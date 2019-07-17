import React, { Component } from "react";
import "./SingleItem.css";

export default class SingleItem extends Component {
    render() {
        return (
            <div className="singleItem">
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
