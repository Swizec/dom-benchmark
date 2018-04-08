/** @jsx h */
import React from "react";
import Preact, { h } from "preact";

const N = 1000;

const ButtonsRow = ({ prepend, insert, append, drop, remove, N, count }) => (
    <div className="row">
        <button onClick={prepend} className="pulse">
            Prepend {N} nodes
        </button>
        <button onClick={insert} className="pulse">
            Insert {N} nodes
        </button>
        <button onClick={append} className="pulse">
            Append {N} nodes
        </button>
        <button onClick={drop} className="pulse">
            Drop all nodes
        </button>
        <button onClick={remove} className="pulse">
            Remove 1 node
        </button>
    </div>
);

class PreactBenchmark extends Preact.Component {
    beforeTime = 0;
    afterTime = 0;
    times = [];

    state = {
        nodes: [],
        lastChangeType: null
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

        this.timeToRenderRef.innerHTML = `<code>${delta}ms</code>`;
        this.times.push(delta);

        this.props.addToBenchmark({
            name: this.props.name,
            value: delta,
            type: this.state.lastChangeType
        });
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
            nodes: [...this.newNodes, ...this.state.nodes],
            lastChangeType: "prepend1000"
        });

    append = () =>
        this.setState({
            nodes: [...this.state.nodes, ...this.newNodes],
            lastChangeType: "append1000"
        });

    insert = () => {
        const { nodes } = this.state;

        this.setState({
            nodes: [
                ...nodes.slice(0, nodes.length / 2),
                ...this.newNodes,
                ...nodes.slice(nodes.length / 2, nodes.length)
            ],
            lastChangeType: "insert1000"
        });
    };

    drop = () =>
        this.setState({
            nodes: [],
            lastChangeType: "dropAll"
        });

    remove = () => {
        const { nodes } = this.state,
            pivot = Math.floor(Math.random() * nodes.length);

        this.setState({
            nodes: [
                ...nodes.slice(0, pivot),
                ...nodes.slice(pivot + 1, nodes.length)
            ],
            lastChangeType: "remove1"
        });
    };

    render(props, state) {
        const { nodes } = state;

        return (
            <div className="benchmark">
                <h2>Preact</h2>
                <p>
                    Implemented as a single component, no state management lib.
                    A{" "}
                    <a href="https://twitter.com/Swizec/status/968741940991791104">
                        Preact component is wrapped in a React component
                    </a>{" "}
                    to fit into the project and handles its own rendering
                    internally. Time measured is between{" "}
                    <code>componentWillUpdate</code> and{" "}
                    <code>componentDidUpdate</code> inside the Preact part.
                </p>
                <p>
                    Time to render:{" "}
                    <b ref={node => (this.timeToRenderRef = node)} />
                    <br />
                    Current count: <code>{nodes.length}</code>
                    <br />
                    Average time: <code>{this.averageTime}ms</code>
                </p>
                <ButtonsRow
                    prepend={this.prepend}
                    insert={this.insert}
                    append={this.append}
                    drop={this.drop}
                    remove={this.remove}
                    N={N}
                />
                <div className="row benchmark-scratchpad">
                    {nodes.map((k, i) => <div key={k}>{k}</div>)}
                </div>
            </div>
        );
    }
}

class Clock extends Preact.Component {
    constructor() {
        super();
        // set initial time:
        this.state = {
            time: Date.now()
        };
    }

    componentDidMount() {
        // update time every second
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
    }

    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    render(props, state) {
        let time = new Date(state.time).toLocaleTimeString();
        return <span>{time}</span>;
    }
}

class Wrapper extends React.Component {
    componentDidMount() {
        this.renderPreact();
    }
    componentDidUpdate() {
        this.renderPreact();
    }
    // Jason's recommendation https://github.com/Swizec/dom-benchmark/pull/2
    shouldComponentUpdate() {
        return false;
    }

    renderPreact() {
        const { name, addToBenchmark } = this.props;

        Preact.render(
            <PreactBenchmark name={this.props.name} />,
            this.refs.anchor,
            this.refs.anchor.firstChild
        );
    }

    render() {
        let h = React.createElement;

        return <div ref="anchor" />;
    }
}

// export default PreactBenchmark;
export default Wrapper;
