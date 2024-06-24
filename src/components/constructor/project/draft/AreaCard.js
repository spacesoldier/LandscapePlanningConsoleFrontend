import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import React from "react";
import {FaArrowRight} from "react-icons/fa6";
import { motion } from "framer-motion";

function AreaCard({area_data, deckUpdateHandler}){

    const MotionButton = motion(Button);

    return (
        <Card
              className="h-80 pt-4 shadow-2xl"
        >
            <CardBody className="h-60">
                <div className="flex flex-col">
                    <Typography>
                        <span className="text-sm pb-2">{area_data.address}</span>
                        <hr className="h-px" />
                        <span className="text-sm pt-2">{area_data.district}</span>
                    </Typography>
                    <Typography>
                        {/*<hr className="h-px" />*/}
                        <span className="flex pt-4 justify-end text-sm">Площадь {area_data.surface} кв.м</span>
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="h-20">
                <div className="flex justify-end">
                    <MotionButton
                        onClick = { () => deckUpdateHandler(area_data.terr_id)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaArrowRight />
                    </MotionButton>
                </div>
            </CardFooter>
        </Card>
    );
}

export default AreaCard
