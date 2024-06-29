import {FaPlus} from "react-icons/fa6";
import {Button, Typography} from "@material-tailwind/react";
import React from "react";

function NewProjectButton({event_proxy}){



    return (
        <Button
            variant="outlined"
            className="h-40 w-80 inline-flex items-center border-4 border-gray-600"
            onClick={() => {event_proxy.sendEvent("init-new-project",{status: true})}}
        >
            <FaPlus className="w-8 h-8"/>
            <span className="pl-16">
                                    <Typography variant="h5" color="blue-gray">
                                        Начать новый
                                    </Typography>
                                </span>
        </Button>
    );


}


export default NewProjectButton
