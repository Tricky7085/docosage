import React, { useState } from 'react';
import classes from '@/styles/age.module.css';
import { useRouter } from 'next/router';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import protectedRoutes from '@/components/protectedRoute';

const AgeSelector = () => {
  const [age, setAge] = useState(25);
  const axiosPrivate = useAxiosPrivate()
  const router = useRouter();

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleNext= async(e)=>{
    try{
        const response = await axiosPrivate.post('updateuserinfo/',{"age":age})
        if(response.status===200){
            router.push('gender')
        }
    }catch(error){
        console.log(error)
    }
   }

  return (
    <div className={classes.container}>
      <label className={classes.label}>Tell us your age</label>
      <div className={classes.selectWrapper}>
        <input
          type="range"
          min="0"
          max="100"
          value={age}
          onChange={handleAgeChange}
          className={classes.range}
        />
      </div>
      <div className={classes.ageDisplay}>{age} years</div>
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={handleNext}>Next</button>
        <button className={classes.button} onClick={() => router.push('/userInfo/gender')}>Skip</button>
      </div>
    </div>
  );
};

export default protectedRoutes(AgeSelector);
