import React, { useState } from 'react';
import classes from '@/styles/weight.module.css';
import { useRouter } from 'next/router';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import protectedRoutes from '@/components/protectedRoute';

const WeightSelector = () => {
  const [weight, setWeight] = useState(50); 
  const router = useRouter();
  const axiosPrivate  = useAxiosPrivate()

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleNext=async()=>{
    try{
        const response = await axiosPrivate.post('updateuserinfo/',{"weight":weight})
        if(response.status===200){
            router.push('sleepingHours')
        }
    }catch(error){
        console.log(error)
    }
   }

  return (
    <div className={classes.container}>
      <label className={classes.label}>Tell us your weight</label>
      <div className={classes.selectWrapper}>
        <input
          type="range"
          min="30"
          max="150"
          value={weight}
          onChange={handleWeightChange}
          className={classes.range}
        />
      </div>
      <div className={classes.weightDisplay}>{weight} kg</div>
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={handleNext}>Next</button>
        <button className={classes.button} onClick={() => router.push('/userInfo/sleepingHours')}>Skip</button>
      </div>
    </div>
  );
};

export default protectedRoutes(WeightSelector);
