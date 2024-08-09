import React, { useState } from 'react';
import classes from '@/styles/height.module.css';
import { useRouter } from 'next/router';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import protectedRoutes from '@/components/protectedRoute';

const HeightSelector = () => {
  const [height, setHeight] = useState(60);
  const [displayHeight, setDisplayHeight] = useState("5'0")
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate()

  const handleHeightDisplay = (e) => {
    let feet = Math.floor((e.target.value) / 12)
    let inches = e.target.value % 12
    setDisplayHeight(`${feet}'${inches}`)
    setHeight(e.target.value)

  }

  const handleNext = async () => {
    try {
      const response = await axiosPrivate.post('updateuserinfo/', { "height": height })
      if (response.status === 200) {
        router.push('weight')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.container}>
      <label className={classes.label}>Tell us your height</label>
      <h3>{displayHeight}</h3>
      <div className={classes.selectWrapper}>
        <input
          type="range"
          min="48"
          max="84"
          value={height}
          onChange={handleHeightDisplay}
          className={classes.range}
        />
      </div>
      <div className={classes.heightDisplay}>{displayHeight}</div>
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={handleNext}>Next</button>
        <button className={classes.button} onClick={() => router.push('/userInfo/weight')}>Skip</button>
      </div>
    </div>
  );
};

export default protectedRoutes(HeightSelector);
