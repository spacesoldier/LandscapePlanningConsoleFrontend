import {Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import MapAdapter from "./MapAdapter";
import MapToolBox from "./MapToolBox";
import AreaTitle from "./AreaTitle";


function MapPanel({event_proxy}) {

    return (

        <Card className="
                                    mt-6
                                    w-full
                                    h-full
                                    basis-8/12
                                    shadow-lg shadow-gray-400
                                    z-20
                                    ">
            <CardBody className="h-full">
                <AreaTitle event_proxy={event_proxy} />
                {/*<hr className="h-px" />*/}

                <div className="
                                            h-[calc(95%)] w-full
                                            border-solid border-2 border-gray-300
                                            rounded-lg
                                            shadow-inner shadow-gray-600
                                            overflow-clip
                                            z-10
                                            ">

                    <MapAdapter
                        className="
                                            h-full w-full
                                          "
                        event_proxy={event_proxy}
                    />

                    <MapToolBox event_proxy={event_proxy}/>

                </div>

            </CardBody>
            <CardFooter className="pt-0">

            </CardFooter>
        </Card>

    );
}

export default MapPanel;

