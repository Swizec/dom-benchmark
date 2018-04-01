import React from "react";

import ReactBenchmark from "./ReactBenchmark";
import VanillaBenchmark from "./VanillaBenchmark";
import SmartVanillaBenchmark from "./SmartVanillaBenchmark";
import PreactBenchmark from "./PreactBenchmark";
import VueBenchmark from "./VueBenchmarkWrapper";

export default () => (
    <React.Fragment>
        <VanillaBenchmark />
        <SmartVanillaBenchmark />
        <PreactBenchmark />
        <VueBenchmark />
    </React.Fragment>
);
