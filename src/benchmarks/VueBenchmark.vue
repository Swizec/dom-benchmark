
<template>
    <div class="benchmark">
        <h2>Vue</h2>
        <p>
            Implemented as a single component, no Vuex.
            A <a href="https://github.com/akxcv/vuera/blob/master/src/wrappers/Vue.js">
                Vue component is wrapped in a React component
            </a> to fit into the project and handles its own rendering
            internally. Time measured is between 
            <code>beforeUpdate</code> and 
            <code>updated</code> inside the Vue part.
        </p>
        <p>
            Time to render: <b><code ref="timeToRender"></code></b>
            <br />
            Current count: <code>{{ nodes.length }}</code>
            <br />
            Average time: <code ref="averageTime"></code>
        </p>
        <div class="row">
            <button v-on:click="prepend()" class="pulse">
                Prepend {{ N }} nodes
            </button>
            <button v-on:click="insert()" class="pulse">
                Insert {{ N }} nodes
            </button>
            <button v-on:click="append()" class="pulse">
                Append {{ N }} nodes
            </button>
            <button v-on:click="drop()" class="pulse">
                Drop all nodes
            </button>
            <button v-on:click="remove()" class="pulse">
                Remove 1 node
            </button>
        </div>
        <div class="row benchmark-scratchpad">
            <div v-for="k in nodes">
                {{ k }}
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ["name", "addToBenchmark"],
    data: function() {
        return {
            nodes: [],
            start: null,
            times: [],
            N: 1000,
            lastChangeType: null
        };
    },
    created() {
        this.startBench();
    },
    beforeUpdate() {
        this.startBench();
    },
    mounted() {
        this.endBench();
    },
    updated() {
        this.endBench();
    },

    methods: {
        startBench() {
            this.start = new Date();
        },

        endBench() {
            let end = new Date(),
                timeToRender = end - this.start;

            this.times.push(timeToRender);

            this.$refs.timeToRender.innerHTML = `${timeToRender}ms`;
            this.$refs.averageTime.innerHTML = `${this.averageTime()}ms`;

            this.addToBenchmark({
                name: this.name,
                value: timeToRender,
                type: this.lastChangeType
            });
        },

        averageTime() {
            return Math.round(
                this.times.reduce((m, n) => m + n, 0) / this.times.length
            );
        },

        newNodes() {
            return new Array(this.N)
                .fill()
                .map(() => `${Math.random()}:${new Date().getTime()}`);
        },

        prepend() {
            this.nodes = [...this.newNodes(), ...this.nodes];
            this.lastChangeType = "prepend1000";
        },

        append() {
            this.nodes = [...this.nodes, ...this.newNodes()];
            this.lastChangeType = "append1000";
        },

        insert() {
            let nodes = this.nodes;

            this.nodes = [
                ...nodes.slice(0, nodes.length / 2),
                ...this.newNodes(),
                ...nodes.slice(nodes.length / 2, nodes.length)
            ];
            this.lastChangeType = "insert1000";
        },

        drop() {
            this.nodes = [];
            this.lastChangeType = "dropAll";
        },

        remove() {
            const nodes = this.nodes;
            pivot = Math.floor(Math.random() * nodes.length);

            this.nodes = [
                ...nodes.slice(0, pivot),
                ...nodes.slice(pivot + 1, nodes.length)
            ];
            this.lastChangeType = "remove1";
        }
    }
};
</script>

<style scoped>

</style>