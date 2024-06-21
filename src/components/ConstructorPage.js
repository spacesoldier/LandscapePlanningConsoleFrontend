import React from "react";
import {StickyNavbar} from "./StickyNavbar";
import SimpleCard from "./SimpleCard";
import {FeaturedImageGallery} from "./ImageGallery";
import {SidebarWithCta} from "./SidebarWithCta";

function ConstructorPage(){
    return (
        <div className="App">
            <StickyNavbar />

            <div class="container">
                <h1 className="bg-slate-500 text-white text-center">This is a Tailwind styled site!</h1>
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
