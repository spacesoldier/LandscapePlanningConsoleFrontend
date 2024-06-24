import Keycloak from "keycloak-js";

const KeycloakConfig = new Keycloak({
    url: "https://auth.simplizio.com/",
    realm: "landscapes",
    clientId: "planner-console-api",
});

export default KeycloakConfig;
