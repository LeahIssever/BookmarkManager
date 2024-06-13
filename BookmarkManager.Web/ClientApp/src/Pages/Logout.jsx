import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const Logout = () => {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    useEffect(() => {
        const logout = async () => {
            await axios.post('/api/account/logout');
            setUser(null);
            navigate("/");
        }
        logout();
    }, []);

    return (<></>);
}

export default Logout;