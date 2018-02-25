import React from "react";

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

export default ButtonsRow;
