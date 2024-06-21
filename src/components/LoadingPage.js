import { Spinner } from "@material-tailwind/react";

export function LoadingPage() {
    return (
        <div className="flex h-screen items-center justify-center">
                <Spinner className="h-12 w-12" />
        </div>
    );
}