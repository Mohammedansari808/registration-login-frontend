import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
const bookValidation = Yup.object({
    firstname: Yup.string().min(3, "pleease enter a valid name").required("please fill"),
    lastname: Yup.string().min(3, "Please enter").required("please fill"),
    email: Yup.string().min(3, "Please enter").required("please fill"),
    username: Yup.string().min(3, "Please enter").required("please fill"),
    password: Yup.string().min(6, "Please enter").matches(/(?=.*[@#$%&()])/, "special case required").required("please fill"),
    confirm_password: Yup.string().min(6, "Please enter").matches(/(?=.*[@#%$%()])/, "special case required").required("please fill")

})
function Signup() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            confirm_password: ""
        }, validationSchema: bookValidation, onSubmit: async (values) => {

            const information = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                username: values.username,
                password: values.password
            }
            console.log(information)

            if (values.password !== values.confirm_password) {
                alert("pass not match")
            } else {
                const data = await fetch('http://localhost:4000/signup', {
                    method: "POST",
                    body: JSON.stringify(information),
                    headers: { "Content-type": 'application/json' }
                })
                const result = await data.json()
                console.log(result)
                if (result.message == "success") {
                    alert("id created pls login")
                    navigate("/login")
                } else {
                    alert("please try again")
                }

            }

        }
    })
    return (
        <div>
            <div>Signup</div>
            <div style={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
                <form style={{ padding: "20px" }} onSubmit={formik.handleSubmit}>
                    <TextField type="text" name="firstname" onBlur={formik.handleBlur} label="firstname" onChange={formik.handleChange} value={formik.values.firstname} />
                    <div>{formik.errors.firstname && formik.touched.firstname ? formik.errors.firstname : null}</div>
                    <TextField type="text" name="lastname" label="lastname" onChange={formik.handleChange} value={formik.values.lastname} />
                    <div>{formik.errors.lastname && formik.touched.lastname ? formik.errors.lastname : null}</div>

                    <TextField type="email" name="email" label="email" onChange={formik.handleChange} value={formik.values.email} />
                    <div>{formik.errors.email && formik.touched.email ? formik.errors.email : null}</div>

                    <TextField type="text" name="username" label="username" onChange={formik.handleChange} value={formik.values.username} />
                    <div>{formik.errors.username && formik.touched.username ? formik.errors.username : null}</div>

                    <TextField type="password" name="password" label="password" onChange={formik.handleChange} value={formik.values.password} />
                    <div>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</div>

                    <TextField type="password" name="confirm_password" label="confirm Password" onChange={formik.handleChange} value={formik.values.confirm_password} />
                    <div>{formik.errors.confirm_password && formik.touched.confirm_password ? formik.errors.confirm_password : null}</div>

                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>

    )
}

export default Signup