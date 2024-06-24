
import { Button } from "@material-tailwind/react";
import ApiClient from "../api/ApiClient";

function LoginButton({buttonSize}){

    const { keycloak } = ApiClient().auth_srv();

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

