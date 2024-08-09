import React from 'react'
import classes from "@/styles/congratulation.module.css"
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';



function Congratulation() {
    const router = useRouter();
    const {userAuth} = useContext(AuthContext)
    console.log(userAuth)

    const handleSetUpGoals = () => {
        router.push("/userInfo/age")
    }

    return (
        <main className={classes.main}>
            <div>
                image
            </div>
            <div className={classes.introContainer}>
                <h1>
                    Congratulation!
                </h1>
                <p>
                    Your account is ready to use. You can setup some daily goals and other information by clicking below button.
                </p>
            </div>
            <div className={classes.buttonContainer}>
                <button onClick={handleSetUpGoals}>Setup Goal and other information</button>
                <button onClick={()=>router.push('/')}>Go to home</button>
            </div>
        </main>
    )
}

export default Congratulation