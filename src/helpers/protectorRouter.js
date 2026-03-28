import { jwtDecode } from "jwt-decode";
import React, { Children, useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom";

function protectorRouter({roles, children}) {
    const token = localStorage.getItem("token");
    const navigateTo = useNavigate();

    const user = useMemo(() => {
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (err) {
            console.log("tokwn invalido", err);
            return null;
        }

    }, [token]);

    useEffect(() => {
        if(!user || user.exp * 1000 < Date.now()){
            navigateTo("/");
            return;
        }
        if(roles && !roles.includs(user.typeUser)){
            navigateTo("/home");
            return;
        }
        return children
    },[user]);
}

export default protectorRouter
