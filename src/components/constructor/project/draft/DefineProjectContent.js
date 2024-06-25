import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaCalculator, FaPlus} from "react-icons/fa6";
import React, {useEffect, useRef, useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import AreaCard from "./AreaCard";
import ProjectItem from "./ProjectItem";
import ApiClient from "../../../api/ApiClient";

function DefineProjectContent({stageUpdateSink, username}){

    const {baseUrl, config} = ApiClient();

    const allAreas = useRef({});
    const userTask = useRef({});
    const currentProject = useRef({});

    const [areasToSelect, setAreasToSelect] = useState([]);
    const [projectAreas, setProjectAreas] = useState([]);


    const prepareProjectContent = async () => {
        axios.all([
                axios.get(`/maf/area/all`, config),
                axios.get(`/maf/tasks/status/${username}`, config),
            ]
        ).then(
            axios.spread(
                (areaListResponse, userTaskStatusResponse) => {
                    console.log(`received ${areaListResponse.data.areas.length} areas`);

                    areaListResponse.data.areas.map(
                        (area) => {
                            allAreas.current[area.terr_id] = area;
                        }
                    );

                    // allAreas.current = areaListResponse.data.areas;
                    // setAreasToSelect(areaListResponse.data.areas);
                    setAreasToSelect(
                        areaListResponse.data.areas.map(
                            area => area.terr_id
                        )
                    )
                    console.log(`current user task ${JSON.stringify(userTaskStatusResponse.data)}`);
                    userTask.current = userTaskStatusResponse.data;
                }
            )
        ).then(
            () => {
                console.log(`request project status for project ${userTask.current.current_task_id}`)
                axios.get(`/maf/projects/${userTask.current.current_task_id}`, config).then(
                    (projectResponse) => {
                        currentProject.current = projectResponse.data.project;
                        console.log(projectResponse.data);
                    }
                ).catch(
                    error => console.error('Error fetching project data:', error)
                );
            }
        ).catch(
            error => console.error('Error fetching data:', error)
        );
    }

    useEffect(() => {
        prepareProjectContent();
    },[])


    const removeItem = (arr, item) => {
        const index = arr.indexOf(item);
        console.log(`item index ${index}`);
        if (index > -1) arr.splice(index, 1);
    }

    const moveAreaToProject = (area_id) => {
        const newAreaDeck = [...areasToSelect];
        removeItem(newAreaDeck, area_id);
        setAreasToSelect(newAreaDeck);

        const newProjectContent = [area_id, ...projectAreas];
        setProjectAreas(newProjectContent);
    }

    const removeAreaFromProject = (area_id) => {

        const newProjectContent = [...projectAreas];
        removeItem(newProjectContent, area_id);
        setProjectAreas(newProjectContent);

        const newAreaDeck = [area_id, ...areasToSelect];
        setAreasToSelect(newAreaDeck);
    }


    const updateProjectContents = async () => {

        projectAreas.map(
            area => {
                currentProject.current.develop_areas[area] = {}
            }
        )
        currentProject.current.status = "IN_PROGRESS";
        userTask.current.current_task_status = "IN_PROGRESS";

        axios.all([
                axios.post(`/maf/projects/update`,currentProject.current, config),
                axios.post(`/maf/tasks/current`, userTask.current, config)
            ]
        ).then(
            axios.spread(
                (updateProjectResponse, currentTaskUpdateResponse) => {
                    console.log(`new project created ${JSON.stringify(updateProjectResponse.data)}`);
                    console.log(`current task updated ${JSON.stringify(currentTaskUpdateResponse.data)}`);
                }
            )
        ).then(
            () => stageUpdateSink("project-edit")
        ).catch(
            error => console.error('Error pushing data:', error)
        );


    }

    return (

            <div className="flex grow flex-row gap-4 pl-2 pr-2 pb-4">
                    <Card className="mt-6 w-full basis-2/3 shadow-lg pl-2">
                        <CardBody className="h-full">
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Список территорий благоустройства
                            </Typography>
                            {/*<hr className="h-px" />*/}
                            <div className="pt-4 h-[calc(95%)] w-full
                                            border-solid border-2 border-gray-400 rounded-lg
                                            shadow-inner
                                            ">
                                <ul className="grid grid-cols-4 gap-4
                                                h-full
                                                -mt-4
                                                pt-4 pl-2 pr-2 pb-2
                                                overflow-y-scroll" >
                                    <AnimatePresence mode="sync">
                                    {
                                        areasToSelect.map(
                                            (area) => {
                                                const deckItemKey = `deck-${area}`
                                                return (
                                                    <motion.li
                                                        layout
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.8, opacity: 0 }}
                                                        transition={{
                                                            type: "spring",
                                                            // delay: 0.5,
                                                            duration: 1.5
                                                        }}
                                                        key={deckItemKey}
                                                    >
                                                    <AreaCard
                                                        area_data={allAreas.current[area]}
                                                        deckUpdateHandler={moveAreaToProject}
                                                    />
                                                    </motion.li>
                                                );
                                            }
                                        )
                                    }
                                    </AnimatePresence>
                                </ul>
                            </div>

                        </CardBody>
                        <CardFooter className="pt-0">

                        </CardFooter>
                    </Card>


                <Card className="mt-6 w-full basis-1/3 shadow-lg pr-2">
                    <CardBody className="h-[calc(90%)]">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                Состав проекта {currentProject.current.project_id}
                        </Typography>
                        <ul className="pt-4 h-[calc(95%)] w-full
                                            border-solid border-2 border-gray-400 rounded-lg
                                            shadow-inner
                                            overflow-y-scroll
                                            "
                        >
                            <AnimatePresence mode="sync">
                                {
                                    projectAreas.map(
                                        (area) => {
                                            const deckItemKey = `project-${area}`
                                            return (
                                                <motion.li
                                                    layout
                                                    initial={{scale: 0.8, opacity: 0}}
                                                    animate={{scale: 1, opacity: 1}}
                                                    exit={{scale: 0.8, opacity: 0}}
                                                    transition={{
                                                        type: "spring",
                                                        // delay: 0.5,
                                                        duration: 1.5
                                                    }}
                                                    key={deckItemKey}
                                                >
                                                    <ProjectItem
                                                        area_data={allAreas.current[area]}
                                                        projectUpdateHandler={removeAreaFromProject}
                                                    />
                                                </motion.li>
                                            );
                                        }
                                    )
                                }
                            </AnimatePresence>
                        </ul>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="grid h-full justify-items-end">
                            <Button
                                className="inline-flex items-center"
                                onClick={updateProjectContents}
                            >
                                <FaCalculator className="w-4 h-4"/>
                                <span className="pl-4">Начать разработку</span>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>

            </div>




    );
}

export default DefineProjectContent

