import {Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";


function AreaTitle({event_proxy}){

    const [titleText, setTitleText] = useState("двор не выбран");

    const updateTitle = (newTitle) => {
        setTitleText(newTitle);
    }

    const receiveAreaSelected = (update) => {
        setTitleText(update.address);
    }

    useEffect(
        () => {
            if (event_proxy !== undefined){
                console.log("set event proxy for AreaTitle")
                event_proxy.subscribeOn("area_title_update", updateTitle);
                event_proxy.subscribeOn("area_selected", receiveAreaSelected);
            } else {
                console.log("AreaTitle: no event proxy provided")
            }
        }, []
    )

    return (
        <Typography variant="h5" color="blue-gray" className="mb-2">
            {titleText}
        </Typography>
    );

}

export default AreaTitle;

