import React, { Component } from "react";

const N = 1000;

class ReactBenchmark extends Component {
    beforeTime = 0;
    afterTime = 0;
    times = [];

    state = {
        nodes: []
    };

    componentWillUpdate() {
        this.before();
    }
    componentWillMount() {
        this.before();
    }

    componentDidUpdate() {
        this.after();
    }
    componentDidMount() {
        this.after();
    }

    before() {
        this.beforeTime = new Date();
    }

    after() {
        this.afterTime = new Date();

        const delta = this.afterTime - this.beforeTime;

        this.refs.time.innerHTML = `<code>${delta}ms</code>`;
        this.times.push(delta);
    }

    get newNodes() {
        return new Array(N)
            .fill()
            .map(() => `${Math.random()}:${new Date().getTime()}`);
    }
    get averageTime() {
        return Math.round(
            this.times.reduce((m, n) => m + n, 0) / this.times.length
        );
    }

    prepend = () =>
        this.setState({
            nodes: [...this.newNodes, ...this.state.nodes]
        });

    append = () =>
        this.setState({
            nodes: [...this.state.nodes, ...this.newNodes]
        });

    insert = () => {
        const { nodes } = this.state;

        this.setState({
            nodes: [
                ...nodes.slice(0, nodes.length / 2),
                ...this.newNodes,
                ...nodes.slice(nodes.length / 2, nodes.length)
            ]
        });
    };

    drop = () => this.setState({ nodes: [] });

    remove = () => {
        const { nodes } = this.state,
            pivot = Math.floor(Math.random() * nodes.length);

        this.setState({
            nodes: [
                ...nodes.slice(0, pivot),
                ...nodes.slice(pivot + 1, nodes.length)
            ]
        });
    };

    render() {
        const { nodes } = this.state;

        return (
            <div className="benchmark">
                <h2>React</h2>
                <p>
                    Implemented as a single component, no state management lib.
                    Time measured between <code>componentWillUpdate</code> and{" "}
                    <code>componentDidUpdate</code>
                </p>
                <p>
                    Time to render: <b ref="time" />
                    <br />
                    Average time: <code>{this.averageTime}ms</code>
                </p>
                <div className="row">
                    <button onClick={this.prepend} className="pulse">
                        Prepend {N} nodes
                    </button>
                    <button onClick={this.insert} className="pulse">
                        Insert {N} nodes
                    </button>
                    <button onClick={this.append} className="pulse">
                        Append {N} nodes
                    </button>
                    <button onClick={this.drop} className="pulse">
                        Drop {nodes.length} nodes
                    </button>
                    <button onClick={this.remove} className="pulse">
                        Remove 1 node
                    </button>
                </div>
                <div className="row benchmark-scratchpad">
                    {nodes.map((k, i) => <div key={k}>{k}</div>)}
                </div>
                <h3>My results</h3>
                <p>Each test repeated 3 times on a prod build of React.</p>
                <p>
                    Avg of Avg time to prepend 1000 nodes up to 30,000:{" "}
                    <code>21ms</code>
                    <br />
                    Avg of Avg time to insert 1000 nodes up to 30,000:{" "}
                    <code>18ms</code>
                    <br />
                    Avg of Avg time to append 1000 nodes up to 30,000:{" "}
                    <code>15ms</code>
                    <br />
                    Avg time to drop 30,000 nodes: <code>195ms</code>
                    <br />
                    Avg time to remove 1 node from 0,000: <code>27ms</code>
                </p>
            </div>
        );
    }
}

export default ReactBenchmark;
