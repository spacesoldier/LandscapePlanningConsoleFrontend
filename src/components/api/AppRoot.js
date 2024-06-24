
import React from "react";
import {ThemeProvider} from "@material-tailwind/react";
import App from "../../App";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import KeycloakConfig from "./Keycloak";

function AppRoot() {

    // /* dev */
    // return (
    //         <React.StrictMode>
    //             <ThemeProvider>
    //                 <App />
    //             </ThemeProvider>
    //         </React.StrictMode>
    // );

    /* for run on server */
    return (
        <ReactKeycloakProvider authClient={KeycloakConfig}>
            <React.StrictMode>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </React.StrictMode>
        </ReactKeycloakProvider>
    );

}

export default AppRoot
