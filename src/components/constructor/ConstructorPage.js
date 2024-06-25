import React, {useEffect} from "react";

import {SystemNavbar} from "./elements/SystemNavbar";
import ProjectList from "./project/list/ProjectList";
import DefineProjectContent from "./project/draft/DefineProjectContent";
import ProjectReport from "./project/report/ProjectReport";
import ApiClient from "../api/ApiClient";
import ProjectEditor from "./project/edit/ProjectEditor";
import axios from "axios";
import {Spinner} from "@material-tailwind/react";

function ConstructorPage(){

    const { keycloak, initialized, baseUrl, config } = ApiClient().auth_srv();

    const curr_username = keycloak.tokenParsed.preferred_username ;

    const [currentStage,setCurrentStage] = React.useState("define_from_user_task");

    const stageMapping = {
            "INIT": "new-project",
            "DRAFT": "new-project",         // TODO: save current draft
            "IN_PROGRESS": "project-edit",  // TODO: save current task progress
            "DONE": "project-overview",
            "IDLE": "projects"
    }


    const updateStage = (newStage) => {
        setCurrentStage(newStage);
    }

    const getUserTask = async () => {
        axios.all([
                axios.get(`/maf/tasks/status/${curr_username}`, config),
            ]
        ).then(
            axios.spread(
                (userTaskStatusResponse) => {

                    console.log(`current user task ${JSON.stringify(userTaskStatusResponse.data)}`);
                    const taskStatus = userTaskStatusResponse.data.current_task_status;
                    if (taskStatus !== undefined){
                        updateStage(stageMapping[taskStatus]);
                    } else {
                        updateStage("projects");
                    }
                }
            )
        ).catch(
            error => console.error('Error fetching current task status:', error)
        );
    }

    useEffect(() => {
        getUserTask();
    },[])

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
        "project-edit": (stageSink) =>{
            return (
                <ProjectEditor username={curr_username} stageUpdateSink={stageSink}/>
            );
        },
        "project-overview": (stageSink) =>{
            return (
                <ProjectReport username={curr_username} stageUpdateSink={stageSink}/>
            );
        },
        "define_from_user_task": (stageSink) => {
            return (
                <div className="flex flex-grow h-full items-center justify-center">
                    <Spinner className="h-12 w-12" />
                </div>
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
