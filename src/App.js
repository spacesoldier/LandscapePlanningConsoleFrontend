import logo from './logo.svg';
import './App.css';

import LoginPage from "./components/landing/LoginPage";
import ConstructorPage from "./components/constructor/ConstructorPage";

import {LoadingPage} from "./components/LoadingPage";
import ApiClient from "./components/api/ApiClient";

function App() {

    const { keycloak, initialized } = ApiClient().auth_srv();

    if (!initialized) {
        return <LoadingPage />
    }

    if (!keycloak.authenticated) {
        return <LoginPage />;
    }

  return (
      <ConstructorPage />
  );
}

export default App;
