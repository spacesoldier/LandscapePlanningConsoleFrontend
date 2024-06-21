import logo from './logo.svg';
import './App.css';

import LoginPage from "./components/LoginPage";
import {useKeycloak} from "@react-keycloak/web";
import ConstructorPage from "./components/ConstructorPage";

// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import KeycloakConfig from "./components/Keycloak";
import {useEffect, useState} from "react";
import {LoadingPage} from "./components/LoadingPage";

function App() {

    // const [kcInitialized, setKcInitialized] = useState(false);
    // useEffect(() => {
    //     const getUserDetails = async () => {
    //         //other code
    //         if (!kcInitialized){
    //             await keycloak.init({});
    //             setKcInitialized(true);
    //         }
    //     };
    //     getUserDetails();
    // },[])

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