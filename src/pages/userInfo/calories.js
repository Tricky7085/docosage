import React, { useState } from 'react';
import classes from '@/styles/calories.module.css';
import { ImFire } from 'react-icons/im'; 
import { useRouter } from 'next/router';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import protectedRoutes from '@/components/protectedRoute';

const Calories = () => {
  const [calories, setCalories] = useState(2000);
  const router = useRouter();
  const axiosPrivate  = useAxiosPrivate()

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleNext=async()=>{
    try{
        const response = await axiosPrivate.post('updateuserinfo/',{"calories":calories})
        if(response.status===200){
            router.push('/')
        }
    }catch(error){
        console.log(error)
    }
   }

  return (
    <main className={classes.main}>
      <h1>Set Your Daily Calorie Goal</h1>
      <div className={classes.circularDivContainer}>
        <div className={classes.outerCircleContainer}>
          <div className={classes.innerCircleContainer}>
            <div className={classes.mainCircleContainer}>
              <ImFire size={50} color='rgb(92, 62, 229)' />
              <h3>{calories}</h3>
              <p>Calories</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.inputContainer}>
        <input
          className={classes.inputSlider}
          type="range"
          min={1000}
          max={5000}
          step={100}
          value={calories}
          onChange={handleCaloriesChange}
        />
      </div>
      <div className={classes.buttonContainer}>
        <button type='button' className={classes.nextButton} onClick={handleNext}>
          Next
        </button>
        <button type='button' className={classes.skipButton}>Skip</button>
      </div>
    </main>
  );
};

export default protectedRoutes(Calories);
