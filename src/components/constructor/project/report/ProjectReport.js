import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaCheck} from "react-icons/fa6";
import React, {useEffect, useRef} from "react";
import axios from "axios";
import ApiClient from "../../../api/ApiClient";

function ProjectReport({username, event_proxy}){

    const {baseUrl, config} = ApiClient();

    const userTask = useRef({});

    const finishWorkOnProject = () => {
        userTask.current.current_task_status = "IDLE";
        userTask.current.has_task = 0;
        userTask.current.current_task_id = "";

        axios.all([
                axios.post(`/maf/users/tasks/current`, userTask.current, config)
            ]
        ).then(
            axios.spread(
                (currentTaskUpdateResponse) => {
                    console.log(`current task updated ${JSON.stringify(currentTaskUpdateResponse.data)}`);
                }
            )
        ).then(
            () => {
                event_proxy.sendEvent("update-stage","projects");
            }
        ).catch(
            error => console.error('Error pushing data:', error)
        );



    }

    const preloadReportStage = () => {
        axios.all([
                axios.get(`/maf/users/tasks/status/${username}`, config),
            ]
        ).then(
            axios.spread(
                (userTaskStatusResponse) => {
                    console.log(`current user task ${JSON.stringify(userTaskStatusResponse.data)}`);
                    userTask.current = userTaskStatusResponse.data;
                }
            )
        ).catch(
            error => console.error('Error fetching data:', error)
        );
    }

    useEffect(preloadReportStage,[]);

    return (
        <Card className="h-[calc(80%)] w-full mt-6 w-96">
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Report
                </Typography>
                <Typography>
                    Project report with calculations
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    className="inline-flex items-center"
                    onClick={finishWorkOnProject}
                >
                    <FaCheck className="w-4 h-4"/>
                    <span className="pl-4">Завершить</span>
                </Button>
            </CardFooter>
        </Card>
    );

}

export default ProjectReport
