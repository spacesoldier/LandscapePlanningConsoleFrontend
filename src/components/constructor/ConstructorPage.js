import {useEffect, useState} from "react";

import {SystemNavbar} from "./elements/SystemNavbar";
import ProjectList from "./project/list/ProjectList";
import DefineProjectContent from "./project/draft/DefineProjectContent";
import ProjectReport from "./project/report/ProjectReport";
import ApiClient from "../api/ApiClient";
import ProjectEditor from "./project/edit/ProjectEditor";
import axios from "axios";
import {Spinner} from "@material-tailwind/react";

function ConstructorPage({event_proxy}){

    const { keycloak, initialized, baseUrl, config } = ApiClient().auth_srv();

    const curr_username = keycloak.tokenParsed.preferred_username ;

    const [currentStage,setCurrentStage] = useState("define_from_user_task");

    const stageMapping = {
            "INIT": "new-project",
            "DRAFT": "new-project",         // TODO: save current draft
            "IN_PROGRESS": "project-edit",  // TODO: save current task progress
            "DONE": "project-overview",
            "IDLE": "projects"
    }


    const page_selector = {
        "projects": () => {
            return (
                <ProjectList username={curr_username} event_proxy={event_proxy} />
            );
        },
        "new-project": () => {
            return (
                <DefineProjectContent username={curr_username} event_proxy={event_proxy}/>
            );
        },
        "project-edit": () =>{
            return (
                <ProjectEditor username={curr_username} event_proxy={event_proxy}/>
            );
        },
        "project-overview": () =>{
            return (
                <ProjectReport username={curr_username} event_proxy={event_proxy}/>
            );
        },
        "define_from_user_task": () => {
            return (
                <div className="flex flex-grow h-full items-center justify-center">
                    <Spinner className="h-12 w-12" />
                </div>
            );
        }
    }

    const updateStage = (newStage) => {
        if (newStage in page_selector){
            setCurrentStage(newStage);
        } else {
            console.log(`wrong stage value ${newStage}`);
        }

    }


    const prepareRequiredData = async () => {
        axios.all([
                axios.get(`/maf/users/tasks/status/${curr_username}`, config),
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

                    event_proxy.subscribeOn("update-stage", updateStage);
                }
            )
        ).catch(
            error => console.error('Error fetching current task status:', error)
        );
    }



    useEffect(() => {
        prepareRequiredData();
    },[]);






    return (
        <div className="App h-full">
            <SystemNavbar />

            <section className="flex grow h-[calc(90%)] overflow-clip">
                {page_selector[currentStage]()}
            </section>

        </div>
    );
}

export default ConstructorPage
