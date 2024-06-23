
import {StickyNavbar} from "./StickyNavbar";
import JumboLandingTron from "./JumboLandingTron";


function LoginPage() {

    return (
        <div className="flex flex-col grow">
            <StickyNavbar />
            {/*<section className="flex flex-grow">*/}
                <JumboLandingTron />
            {/*</section>*/}

        </div>

    );
}

export default LoginPage;
