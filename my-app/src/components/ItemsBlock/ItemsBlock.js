import React, { Component } from "react";
import "./ItemsBlock.css";
import SingleItem from "../SingleItem/SingleItem";

export default class ItemsBlock extends Component {
    renderItems = () => {
        return this.props.items.map(item => {
            return <SingleItem item={item} />;
        });
    };

    render() {
        return <div className="itemsBlock">{this.renderItems()}</div>;
    }
}
