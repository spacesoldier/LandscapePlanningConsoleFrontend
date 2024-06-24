import { useKeycloak } from "@react-keycloak/web";

// const API_BASE_URL = 'http://localhost:8000'; // local dev
//
// // for local dev
// const authProvider = () => {
//
//     let loginStatus = false;
//
//     const providerReady = true;
//
//     const keycloakStub = {
//
//         tokenParsed: {
//                         preferred_username:"architect",
//
//                      },
//         token: "adsfsfsfsadfa",
//         authenticated: loginStatus,
//         login: () => {
//             loginStatus = true;
//         },
//         logout: () => {
//             loginStatus = false;
//         }
//     }
//
//     return {
//         keycloak: keycloakStub,
//         initialized: providerReady
//     }
//
// }
//
// // dev instance
// const config = () => {
//
//     return{
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }
//
// }


const API_BASE_URL = 'https://app.simplizio.com'; // server installation
const authProvider = useKeycloak; // server instance

/* server instance */
const config = () => {

    const token = authProvider().keycloak.token

    return{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

}


function ApiClient() {

    return {
        baseUrl: API_BASE_URL,
        config: config,
        auth_srv: authProvider
    }

}


export default ApiClient

