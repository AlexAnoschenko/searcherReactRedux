import React, { Component } from "react";
import "./Items.css";
import SingleItem from "../SingleItem/SingleItem";

export default class Items extends Component {
    setId = item => {
        const firstWord = "detail/";
        const lastWord = "/title";
        let startIndex = item.lister_url.indexOf(firstWord);
        let endIndex = item.lister_url.indexOf(lastWord);

        var newId = item.lister_url.slice(
            startIndex + firstWord.length + 7,
            endIndex
        );
        return newId;
    };

    renderItems = () => {
        return this.props.items.map(item => {
            return <SingleItem item={item} key={this.setId(item)} />;
        });
    };

    render() {
        return <div className="itemsBlock">{this.renderItems()}</div>;
    }
}
