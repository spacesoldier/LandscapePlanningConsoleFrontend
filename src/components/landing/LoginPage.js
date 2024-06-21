
import {StickyNavbar} from "./StickyNavbar";
import JumboLandingTron from "./JumboLandingTron";

function LoginPage() {

    return (
        <div>
            <StickyNavbar />
            <JumboLandingTron />
        </div>


        // <div>
        //     <div className="container">
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             type="text"
        //             placeholder="Username"
        //             value={username}
        //             onChange={(event) => setUsername(event.target.value)}
        //         />
        //         <input
        //             type="password"
        //             placeholder="Password"
        //             value={password}
        //             onChange={(event) => setPassword(event.target.value)}
        //         />
        //         <button type="submit">Log in</button>
        //     </form>
        //     </div>
        //     <div className="container">
        //         <LoginForm />
        //     </div>
        // </div>
    );
}

export default LoginPage;
