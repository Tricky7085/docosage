import React, { useState } from 'react';

import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import classes from "@/styles/login.module.css"
import Link from 'next/link';

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Invalid information!");
        } else {
            console.log({ ...formData });
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

                <h1>Log in</h1>

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
                    <p className={classes.error}>{error}</p>

                    <div className={classes.loginButtonContainer}>
                        <button type='submit' className={classes.loginButton}>
                            Log in
                        </button>
                    </div>
                </form>

                <div className={classes.googleFacebookMainContainer}>
                    <p> - or Log in with -</p>
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
