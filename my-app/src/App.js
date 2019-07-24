import { connect } from "react-redux";
import React, { Component } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import Items from "./components/Items/Items";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import Pagination from "./components/Pagination/Pagination";
import Loader from "./components/Loader/Loader";
import { changeLoadingOnClick } from "./components/store/actions";

class App extends Component {
    state = {
        modalStatus: false
    };

    setModalItem = value => {
        this.setState({ modalItem: value }, this.toggleModal);
    };

    toggleModal = () => {
        this.setState(state => ({ modalStatus: !state.modalStatus }));
    };

    setLoading = () => {
        if (
            this.props.currentPage !== null &&
            this.props.loadSelector === false
        ) {
            return (
                <Pagination
                    pages={this.props.pages}
                    maxPage={this.props.maxPage}
                />
            );
        } else if (
            this.props.currentPage !== null &&
            this.props.loadSelector === true
        ) {
            return <Loader className="loader" />;
        } else {
            return null;
        }
    };

    render() {
        return (
            <React.Fragment>
                <InputForm toggleFavoriteStatus={this.toggleFavoriteStatus} />
                <Items
                    pageStatus={this.props.pageStatus}
                    favorites={this.props.favorites}
                    items={this.props.items}
                    setModalItem={this.setModalItem}
                />
                {this.state.modalStatus && (
                    <ModalWindow
                        item={this.state.modalItem}
                        toggleModal={this.toggleModal}
                    />
                )}
                {this.setLoading()}
                {this.props.currentPage !== null && (
                    <center>
                        <div>
                            <input
                                type="button"
                                value="Change type of load content..."
                                onClick={this.props.changeLoadingOnClick}
                            />
                        </div>
                    </center>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        items: store.items,
        favorites: store.favorites,
        pageStatus: store.pageStatus,
        maxPage: store.maxPage,
        currentPage: store.currentPage,
        pages: store.pages,
        city: store.city,
        loadSelector: store.loadSelector
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLoadingOnClick: () => dispatch(changeLoadingOnClick())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
