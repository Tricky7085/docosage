import React, { useState } from 'react';
import classes from '@/styles/steps.module.css';
import { RiRunLine } from 'react-icons/ri'; 
import { useRouter } from 'next/router';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import protectedRoutes from '@/components/protectedRoute';

const Steps = () => {
  const [steps, setSteps] = useState(5000);
  const router = useRouter();
  const axiosPrivate  = useAxiosPrivate()

  const handleStepsChange = (e) => {
    setSteps(e.target.value);
  };

  const handleNext = async()=>{
    try{
        const response = await axiosPrivate.post('updateuserinfo/',{"steps":steps})
        if(response.status===200){
            router.push('calories')
        }
    }catch(error){
        console.log(error)
    }
   }

  return (
    <main className={classes.main}>
      <h1>Set Your Daily Steps Goal</h1>
      <div className={classes.circularDivContainer}>
        <div className={classes.outerCircleContainer}>
          <div className={classes.innerCircleContainer}>
            <div className={classes.mainCircleContainer}>
              <RiRunLine size={50} color='rgb(92, 62, 229)' />
              <h3>{steps}</h3>
              <p>Steps</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.inputContainer}>
        <input
          className={classes.inputSlider}
          type="range"
          min={500}
          max={10000}
          step={500}
          value={steps}
          onChange={handleStepsChange}
        />
      </div>
      <div className={classes.buttonContainer}>
        <button type='button' className={classes.nextButton} onClick={handleNext}>
          Next
        </button>
        <button type='button' className={classes.skipButton} onClick={() => router.push('/userInfo/calories')}>Skip</button>
      </div>
    </main>
  );
};

export default protectedRoutes(Steps);
