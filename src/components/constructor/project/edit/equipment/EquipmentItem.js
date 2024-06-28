import {useState} from "react";
import {Accordion, AccordionBody, AccordionHeader} from "@material-tailwind/react";


function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

function EquipmentItem({surface_reqs,event_proxy}){

    const [open, setOpen] = useState(0);

    // const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const handleOpen = (value) => setOpen(value);

    return (

        <div
            className="
                        h-full w-full
                        pl-2 pr-2
                        "
        >

            {/*<Accordion open={open === 1} icon={<Icon id={`icon-acc-{1}`} open={open} />}>*/}
            {/*    <AccordionHeader className="sticky" onClick={() => handleOpen(1)}>*/}
            {/*        Площадка для детей 0-3 лет*/}
            {/*    </AccordionHeader>*/}
            {/*    <AccordionBody>*/}
            {/*        Потребная площадь {surface_reqs.kids_03_playground.required_area} кв.м*/}
            {/*    </AccordionBody>*/}
            {/*</Accordion>*/}
            {/*<Accordion open={open === 2} icon={<Icon id={`icon-acc-{2}`} open={open} />}>*/}
            {/*    <AccordionHeader onClick={() => handleOpen(2)}>*/}
            {/*        Площадка для детей 3-7 лет*/}
            {/*    </AccordionHeader>*/}
            {/*    <AccordionBody>*/}
            {/*        Потребная площадь {surface_reqs.kids_37_playground.required_area} кв.м*/}
            {/*    </AccordionBody>*/}
            {/*</Accordion>*/}
            {/*<Accordion open={open === 3} icon={<Icon id={`icon-acc-{3}`} open={open} />}>*/}
            {/*    <AccordionHeader onClick={() => handleOpen(3)}>*/}
            {/*        Площадка для детей 7-14 лет*/}
            {/*    </AccordionHeader>*/}
            {/*    <AccordionBody>*/}
            {/*        Потребная площадь {surface_reqs.kids_714_playground.required_area} кв.м*/}
            {/*    </AccordionBody>*/}
            {/*</Accordion>*/}
            {/*<Accordion open={open === 4} icon={<Icon id={`icon-acc-{4}`} open={open} />}>*/}
            {/*    <AccordionHeader onClick={() => handleOpen(4)}>*/}
            {/*        Площадка для детей 15-18 лет*/}
            {/*    </AccordionHeader>*/}
            {/*    <AccordionBody>*/}
            {/*        Потребная площадь {surface_reqs.kids_1518_playground.required_area} кв.м*/}
            {/*    </AccordionBody>*/}
            {/*</Accordion>*/}
            {/*<Accordion open={open === 5} icon={<Icon id={`icon-acc-{5}`} open={open} />}>*/}
            {/*    <AccordionHeader onClick={() => handleOpen(5)}>*/}
            {/*        Спортивная площадка*/}
            {/*    </AccordionHeader>*/}
            {/*    <AccordionBody>*/}
            {/*        Потребная площадь {surface_reqs.workout_space.required_area} кв.м*/}
            {/*    </AccordionBody>*/}
            {/*</Accordion>*/}
            {/*<Accordion open={open === 6} icon={<Icon id={`icon-acc-{6}`} open={open} />}>*/}
            {/*    <AccordionHeader onClick={() => handleOpen(6)}>*/}
            {/*        Площадка для тихого отдыха*/}
            {/*    </AccordionHeader>*/}
            {/*    <AccordionBody>*/}
            {/*        Потребная площадь {surface_reqs.workout_space.rest_space} кв.м*/}
            {/*    </AccordionBody>*/}
            {/*</Accordion>*/}
        </div>
    );

}

export default EquipmentItem;

