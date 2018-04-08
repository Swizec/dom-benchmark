import React from "react";

import ReactBenchmark from "./ReactBenchmark";
import VanillaBenchmark from "./VanillaBenchmark";
import SmartVanillaBenchmark from "./SmartVanillaBenchmark";
import PreactBenchmark from "./PreactBenchmark";
import VueBenchmark from "./VueBenchmarkWrapper";

class Benchmarks extends React.Component {
    addToBenchmark = ({ name, type, value }) => {
        // how do I get access to blockchain which is in new context API
        console.log("HAI", this.props);
        // this.props.blockchain.dispatch({
        //     actionType: "ADD_BENCHMARK",
        //     name,
        //     type,
        //     value
        // });
    };

    render() {
        return (
            <React.Fragment>
                {/* <VanillaBenchmark
                    name="vanilla"
                    addToBenchmark={vals => this.addToBenchmark(vals)}
                />
                <SmartVanillaBenchmark
                    name="smart"
                    addToBenchmark={vals => this.addToBenchmark(vals)}
                />
                <ReactBenchmark
                    name="react"
                    addToBenchmark={vals => this.addToBenchmark(vals)}
                />
                <PreactBenchmark
                    name="preact"
                    addToBenchmark={vals => this.addToBenchmark(vals)}
                /> */}
                <VueBenchmark
                    name="vue"
                    addToBenchmark={vals => this.addToBenchmark(vals)}
                />
            </React.Fragment>
        );
    }
}

export default Benchmarks;
