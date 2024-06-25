import {Card, CardBody} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import AreaPanelCard from "./AreaPanelCard";


function AreasPanel({event_proxy}) {

    const [allAreas, setAllAreas] = useState([]);

    const loadAreas = (areas) => {
        setAllAreas(areas);
    }

    useEffect(
        () => {
            if (event_proxy !== undefined){
                console.log("set areas_data event proxy for MapAdapter")
                event_proxy.subscribeOn("areas_data", loadAreas);
            } else {
                console.log("MapAdapter: no event proxy provided")
            }
        }, []
    )

    return (
        <Card className="
                                w-full
                                shadow-lg
                                h-40
                                mt-2
                                rounded-xl shadow-xl shadow-gray-500
                                ">
            <CardBody className="h-full pb-2">
                <div
                    className="
                        flex flex-grow flex-row
                        h-full
                        pl-8 pr-8

                        gap-4
                        overflow-x-scroll
                        overflow-y-clip
                        border-solid rounded-xl
                        shadow-inner shadow-gray-500
                    "
                >

                    {
                        allAreas.map(
                            (area) => {

                                return (
                                    <AreaPanelCard event_proxy={event_proxy} area_data={area}/>
                                )
                            }
                        )
                    }

                </div>
            </CardBody>
        </Card>
    );

}

export default AreasPanel;

