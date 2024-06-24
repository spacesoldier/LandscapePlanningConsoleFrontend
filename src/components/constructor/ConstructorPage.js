import React from "react";

import {SystemNavbar} from "./elements/SystemNavbar";
import ProjectList from "./project/list/ProjectList";
import DefineProjectContent from "./project/draft/DefineProjectContent";
import ProjectReport from "./project/report/ProjectReport";
import ApiClient from "../api/ApiClient";

function ConstructorPage(){

    const { keycloak, initialized } = ApiClient().auth_srv();

    const curr_username = keycloak.tokenParsed.preferred_username ;

    const [currentStage,setCurrentStage] = React.useState("projects");

    const updateStage = (newStage) => {
        setCurrentStage(newStage);
    }

    const page_selector = {
        "projects": (stageSink) => {
            return (
                <ProjectList username={curr_username} stageUpdateSink={stageSink} />
            );
        },
        "new-project": (stageSink) => {
            return (
                <DefineProjectContent username={curr_username} stageUpdateSink={stageSink}/>
            );
        },
        "project-overview": (stageSink) =>{
            return (
                <ProjectReport stageUpdateSink={stageSink}/>
            );
        }
    }

    return (
        <div className="App h-full">
            <SystemNavbar />

            <section className="flex grow h-[calc(90%)] overflow-clip">
                {page_selector[currentStage](updateStage)}
            </section>
        </div>
    );
}

export default ConstructorPage
