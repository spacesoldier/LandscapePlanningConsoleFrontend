import {AnimatePresence, motion} from "framer-motion";
import ProjectItem from "./ProjectItem";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Typography} from "@material-tailwind/react";
import ApiClient from "../../../api/ApiClient";
import ProjectNameTitle from "./ProjectNameTitle";


function ProjectContentPanel({event_proxy, username}) {
    const {baseUrl, config} = ApiClient();

    const allProjectItems = useRef({});
    const [projectItemsToDraw, setProjectItemsToDraw] = useState([]);

    const updateProjectPanelContent = (payload) => {
        allProjectItems.current = payload.project_items;
        setProjectItemsToDraw(payload.item_ids);
    }

    const prepareProjectContentPanel = () => {

        event_proxy.subscribeOn("new-project-content-draft",updateProjectPanelContent);
    }


    useEffect(() => {
        prepareProjectContentPanel();
    },[]);

    return (
        <div className="h-full w-full">
            <ProjectNameTitle event_proxy={event_proxy} />

            <ul className="pt-4 h-[calc(95%)] w-full
                                            border-solid border-2 border-gray-400 rounded-lg
                                            shadow-inner
                                            overflow-y-scroll
                                            "
            >
                <AnimatePresence mode="sync">
                    {
                        projectItemsToDraw.map(
                            (item_id) => {

                                let deckItemKey = "";

                                const item =  allProjectItems.current[item_id];

                                if ("terr_id" in item){
                                    deckItemKey = `project-${item["terr_id"]}`;
                                } else {
                                    if ("cluster_id" in item){
                                        deckItemKey = `project-${item["cluster_id"]}`;
                                    }
                                }

                                return (
                                    <motion.li
                                        layout
                                        initial={{scale: 0.8, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        exit={{scale: 0.8, opacity: 0}}
                                        transition={{
                                            type: "spring",
                                            // delay: 0.5,
                                            duration: 1.5
                                        }}
                                        key={deckItemKey}
                                    >
                                        <ProjectItem
                                            item_data={item}
                                            event_proxy={event_proxy}
                                        />
                                    </motion.li>
                                );
                            }
                        )
                    }
                </AnimatePresence>
            </ul>
        </div>

    );
}


export default ProjectContentPanel

