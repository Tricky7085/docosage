import React, { useState, useEffect } from 'react';

import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import classes from "@/styles/login.module.css"
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export default function LoginPage() {

    const [user, setUser] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()
    const {userAuth,setUserAuth} = useAuth()


    const handleUserType = (e) => {
        setUser(e.target.name);
        setFormData({ email: "", password: "" })
    }

    const handleRememberMeChange = (e) => {
        setChecked(e.target.checked);
    }

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Invalid information!");
        } else {
            try{
                const res = await axios.post("http://127.0.0.1:8000/login/",{userType:user,...formData},{headers:{
                    "Content-Type":"application/json"
                },
            withCredentials:true})
                console.log(res.data);
                if(res?.status===200){
                    setUserAuth(res.data)
                    router.push("/")
                }

            }catch(error){
                if(error?.response?.status===406){
                    setError("Invalid credentials")
                }else{
                    setError("Something went wrong!")
                }
                
            }
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = "https://accounts.google.com/signin";
    }

    const handleFacebookLogin = () => {
        window.location.href = "https://www.facebook.com/login/";
    }

    return (
        <div className={classes.pageContainer}>
            <main className={classes.main}>

                <h1>Sign in</h1>

                <div className={classes.customerOrDoctorButtonContainer}>
                    <button type='button' name='customer' onClick={handleUserType} className={user === 'customer' ? classes.active : classes.inactive}>Customer</button>
                    <button type='button' name='doctor' onClick={handleUserType} className={user === 'doctor' ? classes.active : classes.inactive}>Doctor</button>
                </div>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.formDiv}>
                        <label>
                            Email
                        </label>
                        <input type='email' name='email' required onChange={handleChange} value={formData.email}></input>
                    </div>
                    <div>
                        <label>
                            Password
                        </label>

                        <div className={classes.passwordContainer}>
                            <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} name='password'></input>
                            <button type='button' onClick={() => setShowPassword(!showPassword)}><>{showPassword === true ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}</></button>
                        </div>
                    </div>
                    <div className={classes.rememberMeContainer}>
                        <input type='checkbox' checked={checked} onChange={handleRememberMeChange} />
                        <p>Remember Me</p>
                        <Link href={"/dashboard/forgotPassword"} legacyBehavior>
                            <a>Forgot Password?</a>
                        </Link>
                    </div>
                    <p className={classes.error}>{error}</p>

                    <div className={classes.loginButtonContainer}>
                        <button type='submit' className={classes.loginButton}>
                            Log in
                        </button>
                    </div>
                </form>

                <div className={classes.googleFacebookMainContainer}>
                    <p> - or Sign in with -</p>
                    <div className={classes.googleFacebookContainer}>
                        <button className={classes.loginGoogleButton} onClick={handleGoogleLogin}>Google</button>
                        <button className={classes.loginFacebookButton} onClick={handleFacebookLogin}>Facebook</button>
                    </div>
                </div>

                <div className={classes.signupContainer}>
                    <p>Do not have an account?</p>
                    <Link href={"/dashboard/signup"} legacyBehavior>
                        <a>Sign up</a>
                    </Link>
                </div>

            </main>
        </div>
    )
}
