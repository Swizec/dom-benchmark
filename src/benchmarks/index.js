import React from "react";

import ReactBenchmark from "./ReactBenchmark";
import VanillaBenchmark from "./VanillaBenchmark";
import SmartVanillaBenchmark from "./SmartVanillaBenchmark";
import PreactBenchmark from "./PreactBenchmark";
import VueBenchmark from "./VueBenchmarkWrapper";

import BlockchainContext from "../BlockchainContext";

class Benchmarks extends React.Component {
    addToBenchmark = (blockchain, { name, type, value }) => {
        // how do I get access to blockchain which is in new context API
        blockchain.dispatch({
            actionType: "ADD_BENCHMARK",
            name,
            type,
            value
        });
    };

    render() {
        return (
            <BlockchainContext.Consumer>
                {blockchain => (
                    <React.Fragment>
                        <VanillaBenchmark
                            name="vanilla"
                            addToBenchmark={vals =>
                                this.addToBenchmark(blockchain, vals)
                            }
                        />
                        <SmartVanillaBenchmark />
                        <ReactBenchmark />
                        <PreactBenchmark />
                        <VueBenchmark />
                    </React.Fragment>
                )}
            </BlockchainContext.Consumer>
        );
    }
}

export default Benchmarks;
