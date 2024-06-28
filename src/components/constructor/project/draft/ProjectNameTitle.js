import React, {useEffect, useState} from "react";
import {Typography} from "@material-tailwind/react";


function ProjectNameTitle({event_proxy}){

    const [projectName, setProjectName] = useState("");

    const updateProjectName = (pj_name)  => {
        setProjectName(pj_name);
    }

    useEffect(
        () => {
            event_proxy.subscribeOn("project-name", updateProjectName);
        }
    ,[])

    return (
        <Typography variant="h5" color="blue-gray" className="mb-2">
            Состав проекта {projectName}
        </Typography>
    );

}

export default ProjectNameTitle;
