import {motion} from "framer-motion";
import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaArrowRight, FaTrash} from "react-icons/fa6";


function ProjectItem({area_data, projectUpdateHandler}){

    const MotionButton = motion(Button);

    return (
        <Card
            className="h-40 ml-4 mr-4 mt-4 mb-4 shadow-xl"
        >
            <CardBody className="h-20">
                <div className="flex flex-col">
                    <Typography>
                        <span className="text-sm pb-2 pl-2">{area_data.address}</span>
                        <span className="text-sm pt-2 pl-2">{area_data.district}</span>
                    </Typography>
                    <Typography>
                        <span className="flex pt-4 justify-start text-sm">Площадь {area_data.surface} кв.м</span>
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="h-20">
                <div className="flex justify-end">
                    <MotionButton
                        onClick = { () => projectUpdateHandler(area_data.terr_id)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaTrash />
                    </MotionButton>
                </div>
            </CardFooter>
        </Card>

    );

}

export default ProjectItem

