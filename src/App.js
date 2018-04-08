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

class App extends Component {
    blockchain = {};

    componentDidMount = async () => {
        const FirebaseApp = firebase.initializeApp({
            apiKey: "AIzaSyB_QA9xmUVXbF79oW4ZJEcT4NDQTIXmJjM",
            databaseURL: "https://blockchain-dom-benchmark.firebaseio.com",
            projectId: "blockchain-dom-benchmark"
        });

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

        if (this.blockchain.getState) {
            console.log("Current state", this.blockchain.getState());
        }

        return (
            <Fragment>
                <GitHubForkRibbon href="https://github.com/Swizec/dom-benchmark">
                    Fork me on GitHub
                </GitHubForkRibbon>
                <div className="App">
                    <BlockchainContext.Provider value={this.blockchain}>
                        <IntroCopy />

                        <BlockchainContext.Consumer>
                            {blockchain => (
                                <Benchmarks blockchain={blockchain} />
                            )}
                        </BlockchainContext.Consumer>

                        <div style={{ padding: "3vh" }} />
                    </BlockchainContext.Provider>
                </div>
            </Fragment>
        );
    }
}

export default App;
