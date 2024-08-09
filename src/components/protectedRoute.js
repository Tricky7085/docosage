import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const protectedRoutes = (ProtectedPage) => {
    const WrappedComponent = (props) => {
        const { userAuth } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (userAuth === null || userAuth === undefined) {
                router.push("/dashboard/login");
            }
        }, [userAuth, router]);

        if (userAuth) {
            return <ProtectedPage {...props} />;
        } else {
            return null;
        }
    };

    WrappedComponent.displayName = `Protected(${getDisplayName(ProtectedPage)})`;

    return WrappedComponent;
};

// Utility function to get display name of the wrapped component
const getDisplayName = (Component) => {
    return Component.displayName || Component.name || 'Component';
};

export default protectedRoutes;
