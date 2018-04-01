import "./App.css";
import "./buttons.css";

import React, { Component, Fragment } from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";

import Benchmarks from "./benchmarks";
import IntroCopy from "./IntroCopy";

import { createStore, firebaseMiddleware } from "blockchain-redux";
import * as firebase from "firebase";
import benchmarkReducer from "./benchmarkReducer";

import BlockchainContext from "./BlockchainContext";

const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB_QA9xmUVXbF79oW4ZJEcT4NDQTIXmJjM",
    databaseURL: "https://blockchain-dom-benchmark.firebaseio.com",
    projectId: "blockchain-dom-benchmark"
});

class App extends Component {
    blockchain = {};

    componentDidMount = async () => {
        this.blockchain = await createStore(
            benchmarkReducer,
            firebaseMiddleware(FirebaseApp)
        );

        this.unsubscribe = this.blockchain.subscribe(() => {
            console.log("Hello");
            this.forceUpdate();
        });
        this.forceUpdate();
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        console.log("in render", this.blockchain);

        return (
            <Fragment>
                <GitHubForkRibbon href="https://github.com/Swizec/dom-benchmark">
                    Fork me on GitHub
                </GitHubForkRibbon>
                <div className="App">
                    <BlockchainContext.Provider value={this.blockchain}>
                        <IntroCopy />

                        <Benchmarks />

                        <div style={{ padding: "3vh" }} />
                    </BlockchainContext.Provider>
                </div>
            </Fragment>
        );
    }
}

export default App;
