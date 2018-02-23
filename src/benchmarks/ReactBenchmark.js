import React, { Component } from "react";

const N = 500;

class ReactBenchmark extends Component {
    beforeTime = 0;
    afterTime = 0;

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

        this.refs.time.innerHTML = `<code>${this.afterTime -
            this.beforeTime}ms</code>`;
    }

    get newNodes() {
        return new Array(N)
            .fill()
            .map(() => `${Math.random()}:${new Date().getTime()}`);
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
                        Remove {nodes.length} nodes
                    </button>
                    <button onClick={this.remove} className="pulse">
                        Remove 1 node
                    </button>
                </div>
                <div className="row benchmark-scratchpad">
                    {nodes.map((k, i) => <div key={k}>{k}</div>)}
                </div>
            </div>
        );
    }
}

export default ReactBenchmark;
