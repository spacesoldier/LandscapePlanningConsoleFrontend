import React, { useState } from "react";
// import { useKeycloak } from "@react-keycloak/web";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function LoginForm({keycloakInstance}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    // const { keycloak } = useKeycloak();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await keycloakInstance.login({
                username: username,
                password: password,
            });
        } catch (error) {
            console.error("Failed to log in", error);
        }
    };

    return (
        <section className="grid text-center h-screen items-center p-8">
            <div>
                <Typography variant="h3" color="blue-gray" className="mt-16 mb-2">
                    Вход в систему
                </Typography>
                <Typography className="mb-8 text-gray-600 font-normal text-[18px]">
                    Введите имя пользователя и пароль
                </Typography>
                <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="username">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                имя пользователя
                            </Typography>
                        </label>
                        <Input
                            id="username"
                            color="gray"
                            size="lg"
                            name="username"
                            placeholder="user"
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            onChange={(event) => setUsername(event.target.value)}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                пароль
                            </Typography>
                        </label>
                        <Input
                            size="lg"
                            placeholder="********"
                            onChange={(event) => setPassword(event.target.value)}
                            labelProps={{
                                className: "hidden",
                            }}
                            className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            type={passwordShown ? "text" : "password"}
                            icon={
                                <i onClick={togglePasswordVisiblity}>
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    )}
                                </i>
                            }
                        />
                    </div>
                    <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth>
                        Войти
                    </Button>

                </form>
            </div>
        </section>
    );
}

export default LoginForm;