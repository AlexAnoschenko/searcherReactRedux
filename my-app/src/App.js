//import { connect } from "react-redux";

import React, { Component } from "react";
import "./App.css";
import InputBlock from "./components/InputBlock/InputBlock";
import ItemsBlock from "./components/ItemsBlock/ItemsBlock";

export default class App extends Component {
    state = {
        items: []
    };

    setItems = value => {
        this.setState({ items: value });
    };

    render() {
        return (
            <React.Fragment>
                <InputBlock setItems={this.setItems} />
                <ItemsBlock items={this.state.items} />
            </React.Fragment>
        );
    }
}
