import {Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import React from "react";


function ProjectCard({project_data}){

    const statusMapping = {
        "INIT": "Создан",
        "DRAFT": "Готов к разработке",
        "IN_PROGRESS": "В работе",
        "DONE": "Выполнен"
    }

    return (
        <Card key={project_data.project_id} className="h-40 w-80 shadow-2xl">
            <CardBody>
                <Typography>
                    {/*<span>{project_data.project_name}</span>*/}
                    <span>id проекта</span>
                    <hr className="h-px" />
                    <span>{project_data.project_id}</span>
                </Typography>
                <Typography>
                    {/*<hr className="h-px" />*/}
                    <span className="flex justify-end">{statusMapping[project_data.status]}</span>
                </Typography>
            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
    );

}

export default ProjectCard
