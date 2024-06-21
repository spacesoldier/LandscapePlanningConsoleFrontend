import React from "react";
import SimpleCard from "./SimpleCard";
import {FeaturedImageGallery} from "./ImageGallery";
import {SidebarWithCta} from "./SidebarWithCta";
import {SystemNavbar} from "./SystemNavbar";

import { useKeycloak } from "@react-keycloak/web";

function ConstructorPage({authProviderInstance, authInitialized}){


    return (
        <div className="App">
            <SystemNavbar />

            <div class="container">
                <h1 className="bg-slate-500 text-black text-center">Тут будет список проектов пользователя</h1>
            </div>
            <div class="gap-8 columns-3">
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
            </div>
            <div class="container content-center">
                <FeaturedImageGallery />
            </div>
            <SidebarWithCta />
        </div>
    );
}

export default ConstructorPage
