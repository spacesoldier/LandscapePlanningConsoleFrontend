import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaCheck} from "react-icons/fa6";
import React from "react";

function ProjectReport({stageUpdateSink}){

    return (
        <Card className="mt-6 w-96">
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
                    onClick={() => stageUpdateSink("projects")}
                >
                    <FaCheck className="w-4 h-4"/>
                    <span className="pl-4">Done</span>
                </Button>
            </CardFooter>
        </Card>
    );

}

export default ProjectReport
