import {Button, Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import {FaPlus} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import {nanoid} from "nanoid";
import ApiClient from "../../../api/ApiClient";
import NewProjectButton from "./controls/NewProjectButton";

function ProjectList({event_proxy, username}){

    const [projects,setProjects] = useState([])

    const {baseUrl, config} = ApiClient();

    const initNewProrject = async () => {

        let newProject = {
            project_id: nanoid(8),
            project_name: "to-be-defined",
            owner: username,
            "develop_areas": {

            },
            "develop_clusters": {

            }
        }


        let ownerTaskUpdate = {
            owner_id: username,
            has_task: 1,
            current_task_id: newProject.project_id,
            current_task_status: "INIT"
        }

        axios.all([
                    axios.post(`/maf/projects/new`,newProject, config),
                    axios.post(`/maf/users/tasks/current`, ownerTaskUpdate, config)
                ]
        ).then(
                axios.spread(
                    (newProjectResponse, currentTaskUpdateResponse) => {
                        console.log(`new project created ${JSON.stringify(newProjectResponse.data)}`);
                        console.log(`current task updated ${JSON.stringify(currentTaskUpdateResponse.data)}`);
                        event_proxy.sendEvent("update-stage","new-project");
                    }
                )
        ).then(
                () => {
                    // event_proxy.sendEvent("stage-update","new-project");
                }
        ).catch(
                error => console.error('Error pushing data:', error)
        );
    }

    const retrieveProjectsForUser = async () =>
    {
        axios.all([
            axios.get(`/maf/projects/by-owner/${username}`, config)
        ]).then(
            axios.spread(
                (projectsResponse) => {
                    setProjects(projectsResponse.data.projects);
                    event_proxy.subscribeOn("init-new-project",initNewProrject)
                }
            )
        ).catch(
            error => {console.error('Error fetching data:', error);}
        );
    }

    useEffect(() => {
        retrieveProjectsForUser();
    },[])


    return (
        <div className="flex">
            <Card className="mt-6 w-screen h-[calc(95%)]">
                <CardBody className="h-[calc(97%)]">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Проекты пользователя {username}
                    </Typography>
                    <hr className="h-px" />
                    <div className="grid grid-cols-4
                                    h-[calc(95%)]
                                    pt-4 pl-2 pr-2 pb-2
                                    rounded-lg
                                    overflow-y-scroll" >
                        <div >
                            <NewProjectButton event_proxy={event_proxy}/>
                        </div>

                        {
                            projects.map(
                                project => (
                                                <ProjectCard project_data={project} />
                                            )
                            )
                        }

                    </div>
                </CardBody>
                <CardFooter className="pt-0">

                </CardFooter>
            </Card>
        </div>

    );
}

export default ProjectList
