import React from "react";
import { useContext } from "react";
import usercontext from "../Context/Context";
export default function User() {
    const { user } = useContext(usercontext)
    
    if (!user) return <div>Please login first</div>

    return (
        <div>
            <h2>Welcome {user.user}</h2>
        </div>
    )
}