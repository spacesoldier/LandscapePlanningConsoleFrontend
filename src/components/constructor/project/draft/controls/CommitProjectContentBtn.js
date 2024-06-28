import {FaCalculator} from "react-icons/fa6";
import {Button} from "@material-tailwind/react";
import React from "react";


function CommitProjectContentBtn({event_proxy}){

    return (
        <Button
            className="inline-flex items-center"
            onClick={() => event_proxy.sendEvent("commit-project-content")}
        >
            <FaCalculator className="w-4 h-4"/>
            <span className="pl-4">Начать разработку</span>
        </Button>
    );

}

export default CommitProjectContentBtn;

