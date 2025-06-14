import React, {useContext, useEffect, useState} from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // console.log("Token At User Profile",token);        
        if (!token) {
            navigate('/login')
            return;
        }
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                // console.log("Data: ",response.data);                
                setUser(response.data)
                setIsLoading(false)
            }
        }).catch(err => {
                console.log("Error is at Protected Wrapper".err)
                localStorage.removeItem('token')
                navigate('/UserLogin')
            })
    }, [token])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper