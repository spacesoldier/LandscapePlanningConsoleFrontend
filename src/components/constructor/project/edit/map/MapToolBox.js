import {
    Card,
    CardBody,
    CardFooter,
    IconButton,
    SpeedDial, SpeedDialAction, SpeedDialContent,
    SpeedDialHandler,
    Typography
} from "@material-tailwind/react";
import {FaHammer, FaHighlighter, FaRegObjectGroup, FaToolbox} from "react-icons/fa6";
import {Square3Stack3DIcon} from "@heroicons/react/16/solid";

function MapToolBox({event_proxy}){

    return (
        <div className="
                                                absolute bottom-14 right-10

                                            ">
            <SpeedDial
                placement="top"
            >
                <SpeedDialHandler>
                    <IconButton size="lg"
                                className="
                                                                rounded-full
                                                                shadow-2xl shadow-gray-700
                                                              "
                    >
                        <FaHammer className="
                                                                    shadow-2xl shadow-gray-700
                                                                    h-5 w-5
                                                                    transition-transform
                                                                    group-hover:rotate-45

                                                                " />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction>
                        <FaHighlighter className="h-5 w-5 shadow-2xl shadow-gray-700" />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <FaRegObjectGroup className="h-5 w-5 shadow-2xl shadow-gray-700" />
                    </SpeedDialAction>
                    <SpeedDialAction>
                        <Square3Stack3DIcon className="h-5 w-5 shadow-2xl shadow-gray-700" />
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );

}

export default MapToolBox;
