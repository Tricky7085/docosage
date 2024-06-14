
import React, { useState } from 'react';

import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import classes from "@/styles/signup.module.css"
import Link from 'next/link';

export default function SignupPage() {

    const [user, setUser] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setformData] = useState({ userName: "", email: "", phoneNumber: "", password: "" });
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState("");


    const handleUserType = (e) => {
        setUser(e.target.name);
        setformData({ userName: "", email: "", phoneNumber: "", password: "" })
    }

    const handleChange = (e) => {
        setError("")
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handlePhoneChange = (phone) => {
        setformData({ ...formData, phoneNumber: phone });
    }

    const handleTermsAndContions = (e) => {
        setDisable(e.target.checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.userName || !formData.email || !formData.password || !formData.phoneNumber) {
            setError("Invalid information!")
        }
        else {
            console.log({ userType: user, ...formData })
        }
    }

    const handleGoogleSignup = () => {
        window.location.href = "https://accounts.google.com/signup";
    }

    const handleFacebookSignup = () => {
        window.location.href = "https://www.facebook.com/r.php";
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
                            Your Name
                        </label>
                        <input type='text' name='userName' required onChange={handleChange} value={formData.userName}></input>
                    </div>
                    <div className={classes.formDiv}>
                        <label>
                            Email
                        </label>
                        <input type='email' name='email' required onChange={handleChange} value={formData.email}></input>
                    </div>
                    <div className={classes.formDiv}>
                        <label>
                            Phone Number
                        </label>
                        <PhoneInput
                            country={'us'}
                            value={formData.phoneNumber}
                            onChange={handlePhoneChange}
                        />
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

                    <div>
                        <div className={classes.checkboxContainer}>
                            <input type='checkbox' onChange={handleTermsAndContions}></input>
                            <p>I agree with Privacy Policy and Terms and Conditions</p>
                        </div>
                    </div>


                    <div className={classes.signupButtonContainer}>
                        <button type='submit' className={classes.signupButton} disabled={!disable}>
                            Sign up
                        </button>

                    </div>
                </form>

                <div className={classes.googleFacebookMainContainer}>
                    <p> - or Signup with -</p>
                    <div className={classes.googleFacebookContainer}>
                        <button className={classes.signupGoogleButton} onClick={handleGoogleSignup}>Google</button>
                        <button className={classes.signupFacebookButton} onClick={handleFacebookSignup}>Facebook</button>
                    </div>
                </div>

                <div className={classes.signinContainer}>
                    <p>Already have an account?</p>
                    <Link href={"/dashboard/login"} legacyBehavior>
                        <a>Log in</a>
                    </Link>
                </div>

            </main>
        </div>
    )
}