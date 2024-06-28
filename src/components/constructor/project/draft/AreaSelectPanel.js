import {AnimatePresence, motion} from "framer-motion";
import AreaCard from "./AreaCard";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import ApiClient from "../../../api/ApiClient";


function AreaSelectPanel({event_proxy}){
    const {baseUrl, config} = ApiClient();

    const allAreaItems = useRef({})

    const [areaIdsToDraw, setAreaIdsToDraw] = useState([]);


    const updateAreaIdsToDraw = (payload) => {
        allAreaItems.current = payload.items;
        setAreaIdsToDraw(payload.ids);
    }


    const prepareAreaSelectPanel = () =>{

        event_proxy.subscribeOn("new-area-select-state",updateAreaIdsToDraw)

    }

    useEffect(
        () => {
            prepareAreaSelectPanel();
        }
        ,[])

    return (
        <div className="pt-4 h-[calc(95%)] w-full
                                            border-solid border-2 border-gray-400 rounded-lg
                                            shadow-inner
                                            ">
            <ul className="grid grid-cols-4 gap-4
                                                h-full
                                                -mt-4
                                                pt-4 pl-2 pr-2 pb-2
                                                overflow-y-scroll" >
                <AnimatePresence mode="sync">
                    {
                        areaIdsToDraw.map(
                            (areaId) => {
                                const deckItemKey = `deck-${areaId}`
                                return (
                                    <motion.li
                                        layout
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            // delay: 0.5,
                                            duration: 1.5
                                        }}
                                        key={deckItemKey}
                                    >
                                        <AreaCard
                                            area_data={allAreaItems.current[areaId]}
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

export default AreaSelectPanel;
