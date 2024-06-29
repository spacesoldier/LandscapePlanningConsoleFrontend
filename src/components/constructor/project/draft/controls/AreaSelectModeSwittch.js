import {Switch, Typography} from "@material-tailwind/react";
import {FaExpand, FaTableCells} from "react-icons/fa6";
import React from "react";

function AreaSelectModeSwittch({event_proxy}){

    return (
        <div className="flex row h-8 flex-grow">
            <Typography variant="h5" color="blue-gray" className="mb-2">
                Список территорий благоустройства
            </Typography>
            <div className="flex row flex-grow justify-end">
                <div className="text-xs mt-2 mr-4">Кластерами</div>
                <FaExpand className="mt-2 mr-4"/>
                <Switch

                />
                <FaTableCells className="mt-2 ml-4" />
                <div className="text-xs mt-2 ml-4">Вручную</div>
            </div>

        </div>
    );


}

export default AreaSelectModeSwittch;
