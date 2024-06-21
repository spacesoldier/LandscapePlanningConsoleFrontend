import logo from './logo.svg';
import './App.css';

import LoginPage from "./components/LoginPage";
import {useKeycloak} from "@react-keycloak/web";
import ConstructorPage from "./components/ConstructorPage";

import {useEffect, useState} from "react";
import {LoadingPage} from "./components/LoadingPage";

function App() {

    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <LoadingPage />      //<div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return <LoginPage />;
    }

  return (
      <ConstructorPage />
  );
}

export default App;

// const WrappedApp = () => (
//     <ReactKeycloakProvider authClient={KeycloakConfig}>
//         <App />
//     </ReactKeycloakProvider>
// );
//
// export default WrappedApp;