import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaChartBar} from "react-icons/fa6";
import {useEffect, useState} from "react";
import axios from "axios";
import ApiClient from "../../../../api/ApiClient";
import EquipmentItem from "./EquipmentItem";
import { AnimatePresence, motion } from "framer-motion";

function EquipmentPanel({event_proxy}){

    const {baseUrl, config} = ApiClient();

    const [equipment, setEquipment] = useState({});
    const [hasEquipment, setHasEquipment] = useState(false);




    const loadAreaEquipment = (update) => {
        axios.all([
                axios.get(`/maf/area/equipment/list/${update.terr_id}`, config),
            ]
        ).then(
            axios.spread(
                (equipmentData) => {
                    console.log(`current user task ${JSON.stringify(equipmentData.data.equipment)}`);
                    setEquipment(equipmentData.data.equipment[0]);
                    setHasEquipment(true);
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
            <CardBody className="h-full">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    Наполнение
                    {/*Состав проекта {currentProject.current.project_id}*/}
                </Typography>
                <div className="pt-4 h-[calc(95%)] w-full
                                overflow-y-scroll
                                            "
                >
                    {
                        hasEquipment ? <EquipmentItem
                                                    equipment_item={equipment}
                                                    event_proxy={event_proxy}
                                                /> :
                                    <div></div>
                    }

                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <div className="grid h-full justify-items-end">

                </div>
            </CardFooter>
        </Card>

    );


}

export default EquipmentPanel;
