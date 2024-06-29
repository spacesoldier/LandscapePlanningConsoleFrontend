import {Button, Card, CardBody, CardFooter, Spinner, Typography} from "@material-tailwind/react";
import {FaChartBar} from "react-icons/fa6";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ApiClient from "../../../../api/ApiClient";
import EquipmentItem from "./EquipmentItem";
import { AnimatePresence, motion } from "framer-motion";
import ReportButton from "../controls/ReportButton";

function EquipmentPanel({event_proxy}){

    const {baseUrl, config} = ApiClient();

    const [surfaceReqs, setSurfaceReqs] = useState({});
    const [hasSurfaceReqs, setHasSurfaceReqs] = useState(false);

    const loadAreaEquipment = (update) => {
        axios.all([
                axios.get(`/maf/equipment/surface/required/${update.terr_id}`, config),
            ]
        ).then(
            axios.spread(
                (equipmentData) => {
                    console.log(`current user task ${JSON.stringify(equipmentData.data.requirements)}`);
                    setSurfaceReqs(equipmentData.data.requirements[0]);
                    setHasSurfaceReqs(true);
                }
            )
        ).catch(
            error => console.error('Error fetching data:', error)
        );
    }

    useEffect(
        () => {
            if (event_proxy !== undefined){
                console.log("set event proxy for AreaTitle")
                event_proxy.subscribeOn("area_selected", loadAreaEquipment);
            } else {
                console.log("AreaTitle: no event proxy provided")
            }
        }, []
    )


    return (

        <Card className="
                                    mt-6
                                    w-full
                                    h-full
                                    basis-4/12
                                    pr-4
                                    z-20

                                    shadow-lg shadow-gray-500
                                    ">
            <CardBody className="h-[calc(90%)]">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                    Наполнение
                    {/*Состав проекта {currentProject.current.project_id}*/}
                </Typography>
                <div className="h-[calc(95%)] w-full
                                overflow-y-scroll
                                            "
                >
                    {
                        hasSurfaceReqs ? <EquipmentItem
                                                    surface_reqs={surfaceReqs}
                                                    event_proxy={event_proxy}
                                                /> :
                            <div className="flex flex-grow h-full items-center justify-center">
                                <Spinner className="h-12 w-12" />
                            </div>
                    }

                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <div className="grid h-full justify-items-end">
                    <ReportButton event_proxy={event_proxy} />
                </div>
            </CardFooter>
        </Card>

    );


}

export default EquipmentPanel;
