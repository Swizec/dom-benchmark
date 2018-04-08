import React from "react";
import { VueWrapper } from "vuera";
import VueBenchmark from "./VueBenchmark.vue";

export default ({ name, addToBenchmark }) => (
    <VueWrapper
        component={VueBenchmark}
        name={name}
        addToBenchmark={addToBenchmark}
    />
);
