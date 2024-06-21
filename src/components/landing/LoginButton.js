import { useKeycloak } from "@react-keycloak/web";

import { Typography, Input, Button } from "@material-tailwind/react";

function LoginButton({buttonSize}){

    const { keycloak } = useKeycloak();

    return(
        <Button
            variant="gradient"
            size={buttonSize}
            className="hidden lg:inline-block"
            onClick={() => keycloak.login()}
        >
            Войти
        </Button>
    );
}


export default LoginButton

