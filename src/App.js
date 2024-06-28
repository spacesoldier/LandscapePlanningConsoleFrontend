import logo from './logo.svg';
import './App.css';

import LoginPage from "./components/landing/LoginPage";
import ConstructorPage from "./components/constructor/ConstructorPage";

import {LoadingPage} from "./components/LoadingPage";
import ApiClient from "./components/api/ApiClient";

function App() {

    const { keycloak, initialized } = ApiClient().auth_srv();

    const eventProxyFn = () => {

        const eventHandlers = {
            all: {

            }
        }

        const subscribeOn = (eventName, eventHandler) => {
            if (eventName in eventHandlers.all){
                eventHandlers.all[eventName].push(eventHandler);
                console.log(`register handler for ${eventName}`)
            }
            else {
                console.log(`register handler for new event ${eventName}`)
                eventHandlers.all[eventName] = [eventHandler];
            }
        }

        const sendEvent = (eventName, eventPayload) =>{
            if (eventName in eventHandlers.all){
                eventHandlers.all[eventName].forEach(
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

    const EventProxy = {
        instance: null
    }

    const getEventProxy = () => {
        if (EventProxy.instance == null){
            EventProxy.instance = eventProxyFn();
        }
        return EventProxy.instance;
    };


    if (!initialized) {
        return <LoadingPage />
    }

    if (!keycloak.authenticated) {
        return <LoginPage />;
    }

  return (
      <ConstructorPage event_proxy={getEventProxy()}/>
  );
}

export default App;
