import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";

/* export class GraphQLResult {
    data? : Record<String, Any>;
    errors?: [object];
    extensions?: {
        [key: string]: any;
    };
} */

const ShowItems = () => {
    const [list, setList] = React.useState();

    React.useEffect(() => {
        const fetch = async () => {
            try {
                let result = await API.graphql(graphqlOperation(listTodos));
                setList({ data: result });    
            } catch(e) {
                alert(e);   
            }
        };
        fetch();
    }, [list]);

    if (list) {
        const toDoList = list.data?.data.listTodos;
        return(
            <div>
                <ul style={{ listStyleType: "none" }}>
                    {toDoList.items.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return null;        
    }
};

export default ShowItems;