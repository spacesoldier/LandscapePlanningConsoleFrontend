import {motion} from "framer-motion";
import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaArrowRight, FaTrash} from "react-icons/fa6";


function ProjectItem({item_data, event_proxy}){

    const MotionButton = motion(Button);

    const checkItemToRemove = (item) => {

        let item_type = "";
        let id_of_item = ""
        if ("terr_id" in item){
            item_type = "area";
            id_of_item = item["terr_id"];
        } else {
            if ("cluster_id" in item){
                item_type = "cluster";
                id_of_item = item["cluster_id"];
            }
        }

        return {
            item_type: item_type,
            item_id: id_of_item
        }
    }

    const detectContentByItemType = (item) => {
        if ("terr_id" in item){
            let out = {
                item_type: "Дворовая территория",
                item_info: `ОДС ID ${item.ods_sys_id}`,
                item_info_2: `Площадь ${item.surface} кв.м`
            }
            return out;
        } else {
            if ("cluster_id" in item){
                let item_info = ""
                item.cluster_areas.forEach(
                    (area) => {
                        item_info = item_info + ` ${area.ods_sys_id}`
                    }
                );
                let output = {
                    item_type: "Кластер территорий",
                    item_info: `${item.cluster_areas.length} адресов`,
                    item_info2: item_info
                }
                return output;
            }
        }
    }

    return (
        <Card
            className="h-40 ml-4 mr-4 mt-4 mb-4 shadow-xl"
        >
            <CardBody className="h-20">
                <div className="flex flex-col">
                    <Typography>
                        <span className="text-sm pb-2 pl-2">{detectContentByItemType(item_data).item_type}</span>
                        <span className="text-sm pt-2 pl-2">{detectContentByItemType(item_data).item_info}</span>
                    </Typography>
                    <Typography>
                        <span className="flex pt-4 justify-start text-sm">
                            {detectContentByItemType(item_data).item_info2}
                        </span>
                    </Typography>
                </div>
            </CardBody>
            <CardFooter className="h-20">
                <div className="flex justify-end">
                    <MotionButton
                        onClick = { () => event_proxy.sendEvent(
                                                        "item-removed-from-project",
                                                                checkItemToRemove(item_data)
                                                    )
                                }
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

