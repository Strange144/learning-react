import React from "react";
import { useContext } from "react";
import { useState } from "react";
import usercontext from "../Context/Context";
export default function Login() {
    const [user, setuser] = useState("")
    const [password, setpassword] = useState("")
    const { setUser } = useContext(usercontext)
    const handlesubmit = (e) => {
        e.preventDefault()
        setUser({ user, password })
    }
    return (
        <>
            <h1>MINI CONTEXT</h1>
            <input
                type="text"
                placeholder="Enter Username"
                value={user}
                onChange={(e) => { setuser(e.target.value) }}
            />

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setpassword(e.target.value) }}
            />
            <button type="submit" onClick={handlesubmit}>Login</button>
        </>
    )
}