import React from "react";
import usercontext from "./Context";
import { useState } from "react";
const Usercontextprov = ({ children }) => {
    const [user, setUser] = useState(null)
    return (
        <usercontext.Provider value={{ user, setUser }}>
            {children}
        </usercontext.Provider>)

}

export default Usercontextprov