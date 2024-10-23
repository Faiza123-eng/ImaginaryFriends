
import {React, useEffect, useState} from "react";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "../components/Loader/Loader";
import { Outlet } from "react-router-dom";
import axios from "axios";
import MobileNav from "../components/Profile/MobileNav";


const Profile = () => {
    const [profile, setProfile] = useState();  
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:5000/api/v1/get-user-information",
                { headers }
            );
            setProfile(response.data);
        };
        fetch();
    }, []);

    return (
        <div className="bg-zinc-900 w-full h-screen flex flex-col md:flex-row py-8 gap-4 text-white">
            {!profile && (
                <div className="w-full h-full flex items-center justify-center ">
                    <Loader />
                </div>
            )}

            {profile && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-2 p-4">
                        <Sidebar data={profile} />  
                        <MobileNav/>
                    </div>
                    <div className="md:col-span-10 p-4 overflow-y-auto">
                        <Outlet />  
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;