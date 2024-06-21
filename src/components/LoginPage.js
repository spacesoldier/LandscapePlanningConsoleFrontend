import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import {StickyNavbar} from "./StickyNavbar";
import JumboLandingTron from "./JumboLandingTron";

function LoginPage() {
    const { keycloak } = useKeycloak();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await keycloak.login({
                username,
                password,
            });
        } catch (error) {
            console.error("Failed to log in", error);
        }
    };

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
