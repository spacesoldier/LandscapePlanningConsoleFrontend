import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
} from "@material-tailwind/react";
import { FaUser } from "react-icons/fa6";
import ApiClient from "../../api/ApiClient";
//  import { useKeycloak } from "@react-keycloak/web";

export function SystemNavbar() {

    const {keycloak} = ApiClient().auth_srv();

    const [openNav, setOpenNav] = React.useState(false);
     // const { keycloak, initialized } = useKeycloak();

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <div className="inline-flex items-center">
                    <FaUser className="w-4 h-4"/>
                    {/*<div className="pl-4">architect</div>*/}
                    <div className="pl-4">{keycloak.tokenParsed.preferred_username}</div>
                </div>
            </Typography>
        </ul>
    );

    return (
        // <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
        <div className="-m-6 h-50 w-[calc(100%+20px)]">
            <Navbar className="shadow-lg pb-4 sticky top-0 z-10 h-24 max-w-full rounded-none px-4 py-8 lg:px-8 lg:py-8">
                <div className="pt-2 flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer pl-16 py-1.5 font-medium"
                    >
                        Планирование территорий
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <Button
                                variant="gradient"
                                className="lg:inline-block"
                                hidden={!openNav}
                                // onClick={() => keycloak.logout()}
                            >
                                Выйти
                            </Button>
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    {/*<div className="flex items-center gap-x-1">*/}
                    {/*    <Button*/}
                    {/*        variant="gradient"*/}
                    {/*        className="lg:inline-block"*/}
                    {/*        // onClick={() => keycloak.logout()}*/}
                    {/*    >*/}
                    {/*        Выйти*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </MobileNav>
            </Navbar>
        </div>
    );
}