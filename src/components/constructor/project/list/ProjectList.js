import {Button, Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import {FaPlus} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import {nanoid} from "nanoid";
import ApiClient from "../../../api/ApiClient";

function ProjectList({stageUpdateSink, username}){

    const [projects,setProjects] = useState([])

    const {baseUrl, config} = ApiClient();

    const retrieveProjectsForUser = async () =>
    {
        try {
            await axios.get(`/maf/user/projects/${username}`, config)
                .then(
                    (prj_response) => {
                        const {data} = prj_response;

                        console.log(data);

                        setProjects(data.projects);
                    }
                );
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        retrieveProjectsForUser();
    },[])


    const initNewProrject = async () => {

        let newProject = {
            project_id: nanoid(8),
            project_name: "to-be-defined",
            owner: username,
            "develop_areas": {

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
                    axios.post(`/maf/tasks/current`, ownerTaskUpdate, config)
                ]
        ).then(
                axios.spread(
                    (newProjectResponse, currentTaskUpdateResponse) => {
                        console.log(`new project created ${JSON.stringify(newProjectResponse.data)}`);
                        console.log(`current task updated ${JSON.stringify(currentTaskUpdateResponse.data)}`);
                    }
                )
        ).then(
                () => stageUpdateSink("new-project")
        ).catch(
                error => console.error('Error pushing data:', error)
        );


    }

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
                            <Button
                                variant="outlined"
                                className="h-40 w-80 inline-flex items-center border-4 border-gray-600"
                                // onClick={() => stageUpdateSink("new-project")}
                                onClick={() => {initNewProrject();}}
                            >
                                <FaPlus className="w-8 h-8"/>
                                <span className="pl-16">
                                    <Typography variant="h5" color="blue-gray">
                                        Начать новый
                                    </Typography>
                                </span>
                            </Button>
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
