import logo from './logo.svg';
import './App.css';
import React from "react";
import Amplify from "@aws-amplify/core";
import {Auth} from "@aws-amplify/auth";
import awsConfig from "./aws-exports";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import AddItem from "./components/Add";
import ListItems from "./components/List";

Amplify.configure(awsConfig);
Auth.configure(awsConfig);

function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData);  
    });
  }, []);

  return authState ===  AuthState.SignedIn && user ? (
    <div className="App">
      <AddItem />
      <ListItems />  
    </div>
  ) : (
    <div className="container">
      <div className="signIn">
        <AmplifyAuthenticator />
      </div>
    </div>
  );
}  

export default App;