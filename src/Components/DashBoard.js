import React from 'react'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
    const username = localStorage.getItem("username")
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("x-auth-token")
        localStorage.removeItem("username")
        navigate("/login")

    }
    return (
        <div>
            <h2>DashBoard</h2>
            <h4> hello {username}</h4>
            <button onClick={() => { logout() }}>logout</button>
        </div>
    )
}

export default DashBoard