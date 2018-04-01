import { combineReducers } from "redux";
import React from "react";

const defaultState = {
    prepend1000: [],
    insert1000: [],
    append1000: [],
    dropAll: [],
    remove1: []
};

const benchmarkReducer = function(name) {
    return function(state = defaultState, action) {
        if (name !== action.name) {
            return state;
        }

        switch (action.actionType) {
            case "ADD_BENCHMARK":
                return Object.assign(state, {
                    [action.type]: [...state[action.type], action.value]
                });
            default:
                return state;
        }
    };
};

export default combineReducers({
    vanilla: benchmarkReducer("vanilla"),
    smart: benchmarkReducer("smart"),
    react: benchmarkReducer("react"),
    preact: benchmarkReducer("preact"),
    vue: benchmarkReducer("vue")
});
