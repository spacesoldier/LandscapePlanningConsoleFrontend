import logo from './logo.svg';
import './App.css';

import LoginPage from "./components/landing/LoginPage";
import {useKeycloak} from "@react-keycloak/web";
import ConstructorPage from "./components/constructor/ConstructorPage";

import {LoadingPage} from "./components/LoadingPage";

function App() {

    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <LoadingPage />      //<div>Loading...</div>;
    }

    if (!keycloak.authenticated) {
        return <LoginPage authProviderInstance={keycloak}/>;
    }

  return (
      <ConstructorPage authProviderInstance={keycloak} authInitialized={initialized}/>
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