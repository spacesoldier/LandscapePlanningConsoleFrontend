import {Button, Card, CardBody, CardFooter, Switch, Typography} from "@material-tailwind/react";
import {FaCalculator, FaExpand, FaPlus, FaTableCells} from "react-icons/fa6";
import React, {useEffect, useRef, useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import AreaCard from "./AreaCard";
import ProjectItem from "./ProjectItem";
import ApiClient from "../../../api/ApiClient";
import AreaSelectPanel from "./AreaSelectPanel";
import CommitProjectContentBtn from "./controls/CommitProjectContentBtn";
import ProjectContentPanel from "./ProjectContentPanel";
import AreaSelectModeSwittch from "./controls/AreaSelectModeSwittch";

function DefineProjectContent({event_proxy, username}){

    const {baseUrl, config} = ApiClient();


    const allClusters = useRef({});


    const allAreas = useRef({});
    const areaIdsToSelect = useRef([]);

    const allProjectItems = useRef({});
    const projectItemIds = useRef([]);


    const userTask = useRef({});
    const currentProject = useRef({});

    const detectItemIdField = (item) => {
        if ("terr_id" in item){
            return "terr_id"
        } else {
            if ("cluster_id" in item){
                return "cluster_id"
            }
        }
    }

    const detectItemType = (item) => {
        if ("terr_id" in item){
            return "area";
        } else {
            if ("cluster_id" in item){
                return "cluster";
            }
        }
    }

    const addNewProjectItem = (new_item) => {
        let item_id = new_item[detectItemIdField(new_item)];
        const newProjectItems = [item_id, ...projectItemIds.current];
        projectItemIds.current = newProjectItems;
        allProjectItems.current[item_id] = new_item;

        let event_panel_payload = {
            project_items: allProjectItems.current,
            item_ids: projectItemIds.current
        }
        event_proxy.sendEvent("new-project-content-draft", event_panel_payload);
    }

    const detectEventSend = {
        "area": (id) => event_proxy.sendEvent("area-unselected",id),
        "cluster": (id) => event_proxy.sendEvent("cluster-unselected",id)
    }


    const removeItemFromProject = (project_item) => {

        const newProjectContent = [...projectItemIds.current];
        removeItem(newProjectContent, project_item.item_id);
        projectItemIds.current = newProjectContent;
        delete(allProjectItems.current[project_item.item_id]);

        detectEventSend[project_item.item_type](project_item.item_id);

        const event_panel_payload = {
            project_items: allProjectItems.current,
            item_ids: projectItemIds.current
        }
        event_proxy.sendEvent("new-project-content-draft", event_panel_payload);
    }

    const fillProjectContent = {
        "area": (id) => (currentProject.current.develop_areas[id] = {}),
        "cluster": (id) => (currentProject.current.develop_clusters[id] = {}),
    }


    const updateProjectContents = async () => {

        projectItemIds.current.map(
            itemId => {
                fillProjectContent[detectItemType(allProjectItems.current[itemId])](itemId);
            }
        )
        currentProject.current.status = "IN_PROGRESS";
        userTask.current.current_task_status = "IN_PROGRESS";

        axios.all([
                axios.post(`/maf/projects/update`,currentProject.current, config),
                axios.post(`/maf/users/tasks/current`, userTask.current, config)
            ]
        ).then(
            axios.spread(
                (updateProjectResponse, currentTaskUpdateResponse) => {
                    console.log(`new project created ${JSON.stringify(updateProjectResponse.data)}`);
                    console.log(`current task updated ${JSON.stringify(currentTaskUpdateResponse.data)}`);
                }
            )
        ).then(
            () => {
                console.log("START EDITING");
                event_proxy.sendEvent("update-stage","project-edit");
            }
        ).catch(
            error => console.error('Error pushing data:', error)
        );


    }

    const [clustersToSelect, setClustersToSelect] = useState([]);
    const [projectClusters, setProjectClusters] = useState([]);

    const removeItem = (arr, item) => {
        const index = arr.indexOf(item);
        console.log(`item index ${index}`);
        if (index > -1) arr.splice(index, 1);
    }

    const moveAreaToProject = (area_id) => {
        const newAreaDeck = [...areaIdsToSelect.current];
        removeItem(newAreaDeck, area_id);
        areaIdsToSelect.current = newAreaDeck;


        event_proxy.sendEvent("new_project_item", allAreas.current[area_id]);
        let area_panel_new_state = {ids: areaIdsToSelect.current, items:allAreas.current}
        event_proxy.sendEvent("new-area-select-state", area_panel_new_state);
    }

    const returnAreaToSelect = (area_id) => {
        const newAreaDeck = [area_id, ...areaIdsToSelect.current];
        areaIdsToSelect.current = newAreaDeck;
    }

    const prepareProjectDefineStage = () => {
        axios.all([
                axios.get(`/maf/area/all`, config),
                axios.get(`/maf/users/tasks/status/${username}`, config),
                axios.get(`/maf/area/clusters/all`, config)
            ]
        ).then(
            axios.spread(
                (areaListResponse,userTaskStatusResponse, allClustersResponse) => {
                    console.log(`received ${areaListResponse.data.areas.length} areas`);

                    areaListResponse.data.areas.map(
                        (area) => {
                            allAreas.current[area.terr_id] = area;
                        }
                    );

                    const area_ids = areaListResponse.data.areas.map(
                        area => area.terr_id
                    );

                    areaIdsToSelect.current = area_ids;

                    event_proxy.subscribeOn("area-selected",moveAreaToProject);
                    event_proxy.subscribeOn("area-unselected", returnAreaToSelect);

                    let area_panel_new_state = {ids: areaIdsToSelect.current, items:allAreas.current}
                    event_proxy.sendEvent("new-area-select-state", area_panel_new_state);

                    console.log(`current user task ${JSON.stringify(userTaskStatusResponse.data)}`);
                    userTask.current = userTaskStatusResponse.data;

                    allClustersResponse.data.clusters.map(
                        (cluster) => {
                            allClusters[cluster.cluster_id] = cluster;
                        }
                    );

                    setClustersToSelect(
                        allClustersResponse.data.clusters.map(
                            (cluster) => cluster.cluster_id
                        )
                    );

                    event_proxy.subscribeOn("new_project_item",addNewProjectItem);
                    event_proxy.subscribeOn("item-removed-from-project", removeItemFromProject);
                    event_proxy.subscribeOn("commit-project-content", updateProjectContents);
                }
            )
        ).then(
            () => {
                console.log(`request project status for project ${userTask.current.current_task_id}`)
                axios.get(`/maf/projects/details/${userTask.current.current_task_id}`, config).then(
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
        prepareProjectDefineStage()
    },[])



    return (

            <div className="flex grow flex-row gap-4 pl-2 pr-2 pb-4">
                    <Card className="mt-6 w-full basis-2/3 shadow-lg pl-2">
                        <CardBody className="h-full">
                            <AreaSelectModeSwittch event_proxy={event_proxy} />

                            {/*<hr className="h-px" />*/}
                            <AreaSelectPanel event_proxy={event_proxy} />

                        </CardBody>
                        <CardFooter className="pt-0">

                        </CardFooter>
                    </Card>


                <Card className="mt-6 w-full basis-1/3 shadow-lg pr-2">
                    <CardBody className="h-[calc(90%)]">
                        <ProjectContentPanel event_proxy={event_proxy} username={username} />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="grid h-full justify-items-end">
                            <CommitProjectContentBtn event_proxy={event_proxy}/>
                        </div>
                    </CardFooter>
                </Card>

            </div>

    );
}

export default DefineProjectContent

