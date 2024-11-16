import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
    const [title, setTitle] = useState("Click a button!");

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{title}</h1>
            <button onClick={() => setTitle("Show Title 1")}>obamna....</button>
            <button onClick={(} => setTitle("Show Title 2")} style={{ marginLeft: "10px" }}>
                SODA!!!!!
            </button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
