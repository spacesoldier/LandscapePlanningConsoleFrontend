import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";
import LoginForm from "./LoginForm";

function SubscriptionPopover({btnSize, authService}) {
    return (
        <Popover
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
            }}
        >
            <PopoverHandler>
                <Button
                        variant="gradient"
                        size={btnSize}
                        className="hidden lg:inline-block"
                >
                    Войти
                </Button>
            </PopoverHandler>
            <PopoverContent
                className="w-1/3 z-40"
            >
                <LoginForm keycloakInstance={authService}/>
            </PopoverContent>
        </Popover>
    );
}

export default SubscriptionPopover
