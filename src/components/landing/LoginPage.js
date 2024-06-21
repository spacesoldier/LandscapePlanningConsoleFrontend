
import {StickyNavbar} from "./StickyNavbar";
import JumboLandingTron from "./JumboLandingTron";


function LoginPage({authProviderInstance}) {

    return (
        <div>
            <StickyNavbar authProvider={authProviderInstance}/>
            <JumboLandingTron keycloakInstance={authProviderInstance}/>
        </div>

    );
}

export default LoginPage;
