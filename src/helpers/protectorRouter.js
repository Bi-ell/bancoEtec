import { jwtDecode } from "jwt-decode";
import React, { Children, useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom";

function ProtectorRouter({ roles, children }) {

    const token = localStorage.getItem("token");
    const navigateTo = useNavigate();
    console.log(token)
    const user = useMemo(() => {
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (err) {
            console.log("token invalido", err);
            return null;
        }
        

    }, [token]);

    console.log(user)

    useEffect(() => {
        if (!user || user.exp * 1000 < Date.now()) {
            navigateTo("/");
            return;
        }
        if (roles && !roles.includes(user.typeUser)) {
            navigateTo("/home");
            return;
        }
    }, [user]);
    return children
}

export default ProtectorRouter
