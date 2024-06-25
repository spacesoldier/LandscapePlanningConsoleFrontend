import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaArrowRight} from "react-icons/fa6";
import {motion} from "framer-motion";
import {TbLocation} from "react-icons/tb";

function AreaPanelCard({event_proxy, area_data}){

    const FocusButton = motion(Button);

    const sendMapFocus = (new_focus) => {
        if (event_proxy !== undefined){
            event_proxy.sendEvent(`flyTo--${new_focus.terr_id}`, new_focus);
        }
    }

    const current_area = area_data;

    return (
        <Card
            className="
                        h-24
                        mt-2
                        h-[calc(90%)]

                        shadow-2xl
                        "
        >
            <CardBody className="h-20 w-full">
                <div className="
                                flex flex-row
                                gap-2
                                h-20
                                ">
                    <Typography>
                        <span className="text-xs">{current_area.address}</span>
                        <hr className="h-px" />
                        <span className="text-xs">{current_area.district}</span>
                    </Typography>
                    <Typography>
                        <span className="flex pt-4
                                        ml-2
                                        justify-end text-xs">
                            Площадь {current_area.surface} кв.м
                        </span>
                    </Typography>
                    {/*<div className="flex justify-end">*/}
                        <FocusButton
                            className="
                                        h-10 w-10
                                        mt-4
                                        ml-4
                                        bg-blue-gray-500
                                      "
                            onClick = { () => sendMapFocus(current_area.focus)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <TbLocation  />
                        </FocusButton>
                    {/*</div>*/}
                </div>
            </CardBody>
        </Card>
    );

}


export default AreaPanelCard;


