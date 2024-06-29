import logo from './logo.svg';
import './App.css';

import LoginPage from "./components/landing/LoginPage";
import ConstructorPage from "./components/constructor/ConstructorPage";

import {LoadingPage} from "./components/LoadingPage";
import ApiClient from "./components/api/ApiClient";
import {useRef} from "react";

function App() {

    const { keycloak, initialized } = ApiClient().auth_srv();

    const eventHandlers = useRef({
        all: {

        }
    });

    const eventProxyFn = () => {


        const subscribeOn = (eventName, eventHandler) => {
            if (eventName in eventHandlers.current.all){
                eventHandlers.current.all[eventName].push(eventHandler);
                console.log(`register handler for ${eventName}`)
            }
            else {
                console.log(`register handler for new event ${eventName}`)
                eventHandlers.current.all[eventName] = [eventHandler];
            }
        }

        const sendEvent = (eventName, eventPayload) =>{
            if (eventName in eventHandlers.current.all){
                eventHandlers.current.all[eventName].forEach(
                    (handler) => {
                        handler(eventPayload);
                    }
                )
            }
        }

        return {
            subscribeOn,
            sendEvent
        }
    };

    const EventProxy = useRef(eventProxyFn());


    if (!initialized) {
        return <LoadingPage />
    }

    if (!keycloak.authenticated) {
        return <LoginPage />;
    }

  return (
      <ConstructorPage event_proxy={EventProxy.current}/>
  );
}

export default App;
