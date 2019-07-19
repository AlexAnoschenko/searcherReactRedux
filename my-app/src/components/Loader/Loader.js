import React, { Component } from "react";
import "./Loader.css";

export default class Loader extends Component {
    render() {
        return (
            <div>
                <center>
                    <input
                        type="button"
                        className="load-button"
                        value="Load..."
                        onClick={this.props.loader}
                    />
                </center>
            </div>
        );
    }
}
