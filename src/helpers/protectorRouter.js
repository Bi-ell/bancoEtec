import { jwtDecode } from "jwt-decode";
import React, { useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom";

function protectorRouter() {
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
    },[]);
}

export default protectorRouter
