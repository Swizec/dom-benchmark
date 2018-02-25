import "./App.css";
import "./buttons.css";

import React, { Component, Fragment } from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";

import ReactBenchmark from "./benchmarks/ReactBenchmark";
import VanillaBenchmark from "./benchmarks/VanillaBenchmark";

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
                            Hi 👋<br />I was recently asked to improve chatroom
                            performance. The longer chats became, the more users
                            complained that everything is sluggish.
                        </p>
                        <p>
                            The chatroom was built in Backbone and jQuery and{" "}
                            <a href="https://swizec.com/blog/build-list-virtualization/swizec/8167">
                                I tried many ways to make it better
                            </a>. Everything was hard and cumbersome. In the end
                            I realized that re-rendering the whole list of
                            messages, even without a smart framework, is fast
                            enough. That made me wonder
                        </p>
                        <p>
                            <em style={{ fontSize: "1.2em" }}>
                                "Did the DOM get fast?"
                            </em>{" "}
                            🧐
                        </p>
                        <p>
                            Below are a few benchmarks. Click buttons to see
                            your own results. Charts for what I saw. :)
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
                    <VanillaBenchmark />
                    <h2>Vue coming soon ...</h2>
                    <h2>Preact coming soon ...</h2>
                    <div style={{ padding: "3vh" }} />
                </div>
            </Fragment>
        );
    }
}

export default App;
