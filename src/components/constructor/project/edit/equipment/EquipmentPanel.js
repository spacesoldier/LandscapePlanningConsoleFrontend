import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {AnimatePresence} from "framer-motion";
import {FaChartBar} from "react-icons/fa6";


function EquipmentPanel({event_proxy}){

    const projectEditComplete = () => {
        event_proxy.sendEvent("project_edit_complete",{complete:true})
    }

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
                <ul className="pt-4 h-[calc(95%)] w-full
                                            border-solid border-2 border-gray-400 rounded-lg
                                            shadow-inner
                                            overflow-y-scroll
                                            "
                >
                    <AnimatePresence mode="sync">
                        {
                            // projectAreas.map(
                            //     (area) => {
                            //         const deckItemKey = `project-${area}`
                            //         return (
                            //             <motion.li
                            //                 layout
                            //                 initial={{scale: 0.8, opacity: 0}}
                            //                 animate={{scale: 1, opacity: 1}}
                            //                 exit={{scale: 0.8, opacity: 0}}
                            //                 transition={{
                            //                     type: "spring",
                            //                     // delay: 0.5,
                            //                     duration: 1.5
                            //                 }}
                            //                 key={deckItemKey}
                            //             >
                            //                 <ProjectItem
                            //                     area_data={allAreas.current[area]}
                            //                     projectUpdateHandler={removeAreaFromProject}
                            //                 />
                            //             </motion.li>
                            //         );
                            //     }
                            // )
                        }
                    </AnimatePresence>
                </ul>
            </CardBody>
            <CardFooter className="pt-0">
                <div className="grid h-full justify-items-end">
                    <Button
                        className="inline-flex items-center"
                        onClick={() => {projectEditComplete()}}
                    >
                        <FaChartBar className="w-4 h-4"/>
                        <span className="pl-4">Сформировать отчёт</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>

    );


}

export default EquipmentPanel;
