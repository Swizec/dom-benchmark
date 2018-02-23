import "./App.css";
import "./buttons.css";

import React, { Component, Fragment } from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";
import ReactBenchmark from "./benchmarks/ReactBenchmark";

class App extends Component {
    render() {
        return (
            <Fragment>
                <GitHubForkRibbon href="https://github.com/Swizec/dom-benchmark">
                    Fork me on GitHub
                </GitHubForkRibbon>
                <div className="App">
                    <div className="App-heading App-flex">
                        <h2>
                            Let's benchmark the{" "}
                            <span className="App-react">DOM</span>
                        </h2>
                    </div>
                    <div className="App-instructions App-flex">
                        <p>
                            Below are a few benchmarks. Each benchmark performs
                            a few types of operations and records how long it
                            takes. We 👇
                        </p>
                        <ul>
                            <li>create a long list</li>
                            <li>append to it</li>
                            <li>prepend to it</li>
                            <li>insert in the middle</li>
                            <li>remove elements</li>
                        </ul>
                        <p>
                            Benchmarks focus on long flat lists of nodes because
                            that's pretty common. Think chat window with
                            thousands of messages. Our goal is to find which is
                            faster
                        </p>
                        <ul>
                            <li>Raw DOM with vanilla JS</li>
                            <li>React</li>
                            <li>Vue</li>
                            <li>Preact</li>
                        </ul>
                        <p>
                            Don't worry, benchmarks are implemented in the
                            respective framework internally. I'm just using
                            React for the skeleton because it's what I'm used to
                            and <code>nwb</code> made it quick to set up
                            compiling and stuff. You can see{" "}
                            <a href="https://github.com/Swizec/dom-benchmark">
                                the code on GitHub
                            </a>.
                        </p>
                        <hr />
                    </div>
                    <ReactBenchmark />
                    <div style={{ padding: "3vh" }} />
                </div>
            </Fragment>
        );
    }
}

export default App;
