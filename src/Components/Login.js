import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup"
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const bookValidation = Yup.object({
        username: Yup.string().min(3, "pleease enter a valid name").required("please fill"),
        password: Yup.string().min(6, "Please enter").matches(/(?=.*[@#$%&()])/, "special case required").required("please fill"),
    })
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            user_email: "",
            password: ""
        }, validationSchema: bookValidation, onSubmit: async (values) => {
            const information = {
                user_email: values.username,
                password: values.password
            }

            const data = await fetch("http://localhost:4000/login", {
                method: "POST",
                body: JSON.stringify(information),
                headers: {
                    "Content-type": "application/json"
                }
            })
            const result = await data.json()
            if (result.message == "success") {
                localStorage.setItem("x-auth-token", result.token)
                localStorage.setItem("username", result.data.username)
                alert("login success")
                navigate("/dashboard")
            } else {
                alert("username or password is incorrect")
            }


        }
    })

    return (
        <div>
            <div>Login</div>
            <form onSubmit={formik.handleSubmit}>
                <TextField type="text" name="username" label="username" onChange={formik.handleChange} value={formik.values.username} />
                <div>{formik.errors.username && formik.touched.username ? formik.errors.username : null}</div>
                <TextField type="password" name="password" label="password" onChange={formik.handleChange} value={formik.values.password} />
                <div>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</div>
                <button type="submit">Login</button>

            </form>

        </div>

    )
}

export default Login