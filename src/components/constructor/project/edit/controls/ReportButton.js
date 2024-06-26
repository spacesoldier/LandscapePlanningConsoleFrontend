import {FaChartBar} from "react-icons/fa6";
import {Button} from "@material-tailwind/react";
import {useEffect} from "react";

function ReportButton({event_proxy}){

    const projectEditComplete = () => {
        event_proxy.sendEvent("project_edit_complete",{complete:true})
    }

    useEffect(() => {

    },[])

    return (
        <Button
            className="inline-flex items-center"
            onClick={() => {projectEditComplete()}}
        >
            <FaChartBar className="w-4 h-4"/>
            <span className="pl-4">Сформировать отчёт</span>
        </Button>
    )

}

export default ReportButton;