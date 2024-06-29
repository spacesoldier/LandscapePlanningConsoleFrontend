
import {useEffect, useRef} from "react";
import axios from "axios";
import ApiClient from "../../../api/ApiClient";
import MapPanel from "./map/MapPanel";
import EquipmentPanel from "./equipment/EquipmentPanel";
import AreasPanel from "./areas/AreasPanel";


function ProjecEditor({event_proxy, username}){

    const {baseUrl, config} = ApiClient();

    const allAreas = useRef({});
    const userTask = useRef({});
    const currentProject = useRef({});

    const finishProjectEditing = (payload) => {
        userTask.current.current_task_status = "DONE";
        currentProject.current.status = "DONE";

        axios.all([
                axios.post(`/maf/projects/update`,currentProject.current, config),
                axios.post(`/maf/users/tasks/current`, userTask.current, config)
            ]
        ).then(
            axios.spread(
                (updateProjectResponse, currentTaskUpdateResponse) => {
                    console.log(`project edit completed ${JSON.stringify(updateProjectResponse.data)}`);
                    console.log(`current task updated ${JSON.stringify(currentTaskUpdateResponse.data)}`);

                }
            )
        ).then(
            () => {
                event_proxy.sendEvent("update-stage","project-overview");
            }
        ).catch(
            error => console.error('Error pushing data:', error)
        );
    }

    const preloadProjectContent = async () =>{
        axios.all([
                axios.get(`/maf/users/tasks/status/${username}`, config),
            ]
        ).then(
            axios.spread(
                (userTaskStatusResponse) => {
                    console.log(`current user task ${JSON.stringify(userTaskStatusResponse.data)}`);
                    userTask.current = userTaskStatusResponse.data;

                    const project_id = userTaskStatusResponse.data.current_task_id;
                    console.log(`request project areas details ${project_id}`)
                    axios.get(`/maf/projects/areas/${project_id}`, config)
                        .then(
                        (areaListResponse) => {
                            console.log(`received ${areaListResponse.data.areas.length} areas`);

                            allAreas.current = areaListResponse.data.areas;

                            event_proxy.sendEvent("area_title_update","Список получен");
                            event_proxy.sendEvent("areas_data", areaListResponse.data.areas)

                            event_proxy.subscribeOn("project_edit_complete", finishProjectEditing)
                        }
                    ).catch(
                        error => console.error('Error fetching areas data:', error)
                    );


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
            )
        ).catch(
            error => console.error('Error fetching data:', error)
        );
    }

    useEffect(() => {
        preloadProjectContent();
    },[])


    return (
        <div className="
                            flex-col
                            h-[calc(96%)]
                            w-full
                            gap-2
                        "
        >
            <div className="
                        flex grow flex-row
                        gap-4
                        h-[calc(75%)]
                        pt-2
                        pl-4 pr-4
                        ">

                <MapPanel event_proxy={event_proxy}/>

                <EquipmentPanel event_proxy={event_proxy} />

            </div>

            <div className="
                        flex grow flex-row
                        h-[calc(25%)]
                        pl-4 pr-4
                        pt-2
                        ">
                <AreasPanel event_proxy={event_proxy} />
            </div>

        </div>


    );

}


export default ProjecEditor;
