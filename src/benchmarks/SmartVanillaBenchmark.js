import React, { Component } from "react";

import ButtonsRow from "../ButtonsRow";

const N = 1000;

class VanillaBenchmark extends Component {
    nodes = [];
    times = [];

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

    prepend = () => {
        let nodes = this.newNodes,
            scratchpad = this.refs.scratchpad;
        this.nodes = [...nodes, ...this.nodes];

        let start = new Date();

        nodes.map(k => {
            let node = document.createElement("div");
            node.appendChild(document.createTextNode(k));
            return node;
        });
        scratchpad.prepend(nodes);

        this.updateMeta("prepend1000", start);
    };

    append = () => {
        let nodes = this.newNodes,
            scratchpad = this.refs.scratchpad;
        this.nodes = [...this.nodes, ...this.newNodes];

        let start = new Date();

        nodes.map(k => {
            let node = document.createElement("div");
            node.append(document.createTextNode(k));
            return node;
        });
        scratchpad.append(nodes);

        this.updateMeta("append1000", start);
    };

    insert = () => {
        const nodes = this.nodes,
            newNodes = this.newNodes,
            scratchpad = this.refs.scratchpad;

        this.nodes = [
            ...nodes.slice(0, nodes.length / 2),
            ...this.newNodes,
            ...nodes.slice(nodes.length / 2, nodes.length)
        ];

        let start = new Date();

        if (scratchpad.children.length === 0) {
            let node = document.createElement("div");
            node.appendChild(document.createTextNode("base"));
            scratchpad.appendChild(node);
        }

        let pivotNode =
            scratchpad.children[Math.floor(scratchpad.children.length / 2)];

        console.log(scratchpad.children);

        newNodes.forEach(k => {
            let node = document.createElement("div");
            node.append(document.createTextNode(k));

            scratchpad.insertBefore(node, pivotNode);
        });

        this.updateMeta("insert1000", start);
    };

    drop = () => {
        this.nodes = [];

        let start = new Date();

        // from https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        let scratchpad = this.refs.scratchpad;

        while (scratchpad.firstChild) {
            scratchpad.removeChild(scratchpad.firstChild);
        }

        this.updateMeta("dropAll", start);
    };

    remove = () => {
        const nodes = this.nodes,
            pivot = Math.floor(Math.random() * nodes.length),
            scratchpad = this.refs.scratchpad;

        this.nodes = [
            ...nodes.slice(0, pivot),
            ...nodes.slice(pivot + 1, nodes.length)
        ];

        let start = new Date();

        if (scratchpad.children.length > 0) {
            let node = scratchpad.children[pivot];
            scratchpad.removeChild(node);
        }

        this.updateMeta("remove1", start);
    };

    updateMeta(type, start, end = new Date()) {
        this.times.push(end - start);

        // update meta info
        this.refs.time.innerHTML = `<code>${end - start}ms</code>`;
        this.refs.currentCount.innerHTML = this.nodes.length;
        this.refs.avgTime.innerHTML = this.averageTime;

        this.props.addToBenchmark({
            name: this.props.name,
            value: end - start,
            type
        });
    }

    render() {
        return (
            <div className="benchmark">
                <h2>Smart Vanilla JS</h2>
                <p>
                    Implemented as a React component for buttons and{" "}
                    <code>onClick</code> event handlers. Relevant DOM
                    manipulation built with vanilla JavaScript attempting to
                    minimize amount of DOM changes.
                </p>
                <p>
                    Time to render: <b ref="time" />
                    <br />
                    Current count: <code ref="currentCount" />
                    <br />
                    Average time: <code ref="avgTime" />
                </p>
                <ButtonsRow
                    prepend={this.prepend}
                    insert={this.insert}
                    append={this.append}
                    drop={this.drop}
                    remove={this.remove}
                    N={N}
                />
                <div className="row benchmark-scratchpad" ref="scratchpad" />
            </div>
        );
    }
}

export default VanillaBenchmark;
