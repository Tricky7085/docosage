
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import classes from "@/styles/signup.module.css"
import Link from 'next/link';
import axios from '@/pages/api/axios';
import AuthContext from '@/context/AuthContext';

export default function SignupPage() {

    const [user, setUser] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setformData] = useState({ name: "", email: "", phone_number: "", password_hash: "" });
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState("");
    const router = useRouter()
    const {userAuth, setUserAuth} = useContext(AuthContext)


    const handleUserType = (e) => {
        setUser(e.target.name);
        setformData({ name: "", email: "", phone_number: "", password_hash: "" })
    }

    const handleChange = (e) => {
        setError("")
        setformData({ ...formData, [e.target.name]: e.target.value });
    }

    const handlePhoneChange = (phone) => {
        setformData({ ...formData, phone_number: phone });
    }

    const handleTermsAndContions = (e) => {
        setDisable(e.target.checked);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.name || !formData.email || !formData.password_hash || !formData.phone_number){
            setError("Invalid informations!")
        }else{
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            let passwordText = passwordRegex.test(formData.password_hash)
            if(!passwordText){
                setError("Password must be at least 8 characters long and contain a lowercase letter, an uppercase letter, and a digit")
            }else{
                try{
                    const res = await axios.post("register/",{account_type:user,...formData})
                    console.log(res.data);
                    if(res.status===201){
    
                        setUserAuth(res.data)
                        router.push('congratulation')
                    }
                }catch(error){
                    if(error?.response?.data?.email){
                        setError("User with this email already exists.")
                    }
                    else if(error?.response?.data?.phone_number){
                        setError("User with this phone number already exists.")
                    }
                    else{
                        setError(error.message)
                    }
                }
            }
        }
    }

    // useEffect(()=>{
    //     const fetchData = async ()=>{
    //         try{
    //             const res = await fetch('http://127.0.0.1:8000/users/')
    //             const data = await res.json()
    //             console.log(data.results)
    //         }catch(error){
    //             console.log("ERROR :--",error)
    //         }
           
    //     }
    //     // fetchData();
    // },[])

    const handleGoogleSignup = () => {
        window.location.href = "https://accounts.google.com/signup";
    }

    const handleFacebookSignup = () => {
        window.location.href = "https://www.facebook.com/r.php";
    }

    return (
        <div className={classes.pageContainer}>
            <main className={classes.main}>

                <h1>Sign up</h1>

                <div className={classes.customerOrDoctorButtonContainer}>
                    <button type='button' name='customer' onClick={handleUserType} className={user === 'customer' ? classes.active : classes.inactive}>Customer</button>
                    <button type='button' name='doctor' onClick={handleUserType} className={user === 'doctor' ? classes.active : classes.inactive}>Doctor</button>
                </div>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.formDiv}>
                        <label>
                            Your Name
                        </label>
                        <input type='text' name='name' required onChange={handleChange} value={formData.name}></input>
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
                            value={formData.phone_number}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div>
                        <label>
                            Password
                        </label>

                        <div className={classes.passwordContainer}>

                            <input type={showPassword ? 'text' : 'password'} value={formData.password_hash} onChange={handleChange} name='password_hash'></input>
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