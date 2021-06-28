import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations.js";


const AddItem = () => {
    const [item, setItem] = React.useState();
    
    const save = async () => {
        const data = { name: item };
        try {
            await API.graphql(graphqlOperation(createTodo, { input: data }));
            console.log("Success!");
        } catch (e) {
            console.log("Error!: " + e);
        }
    };

    return (
        <div>
            <h1>TO-DO LIST</h1>
            <input onChange={e => setItem(e.target.value)}></input>
            <button onClick={() => save()}>Save</button>
        </div>
    );
};

export default AddItem;