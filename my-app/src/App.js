import { connect } from "react-redux";
import React, { Component } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import Items from "./components/Items/Items";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import Pagination from "./components/Pagination/Pagination";
import Loader from "./components/Loader/Loader";
import { changeLoadingOnClick } from "./components/store/actions";
import { Route, Switch } from "react-router-dom";

class App extends Component {
    state = {
        modalStatus: false,
        modalItem: null
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

    setIdModal = item => {
        if (this.state.modalItem != null) {
            const firstWord = "detail/";
            const lastWord = "/title";
            let startIndex = item.lister_url.indexOf(firstWord);
            let endIndex = item.lister_url.indexOf(lastWord);

            var newId = item.lister_url.slice(
                startIndex + firstWord.length + 7,
                endIndex
            );
            return newId;
        }
    };

    render() {
        return (
            <React.Fragment>
                <InputForm toggleFavoriteStatus={this.toggleFavoriteStatus} />

                <Switch>
                    <Route
                        exact
                        path="/favorites"
                        render={() => (
                            <Items
                                pageStatus={this.props.pageStatus}
                                favorites={this.props.favorites}
                                items={this.props.items}
                                setModalItem={this.setModalItem}
                            />
                        )}
                    />

                    <Route
                        exact
                        path={`/search/:city/:page`}
                        render={() => (
                            <Items
                                pageStatus={this.props.pageStatus}
                                favorites={this.props.favorites}
                                items={this.props.items}
                                setModalItem={this.setModalItem}
                                setIdModal={this.setIdModal}
                            />
                        )}
                    />

                    <Route
                        exact
                        path={`/search/:city/:page/:id`}
                        render={() => (
                            <ModalWindow
                                item={this.state.modalItem}
                                toggleModal={this.toggleModal}
                                currentPage={this.props.currentPage}
                                city={this.props.city}
                            />
                        )}
                    />
                </Switch>

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
