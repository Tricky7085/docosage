import { useState } from 'react';
import classes from '@/styles/sleepingHours.module.css';
import { useRouter } from 'next/router';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import protectedRoutes from '@/components/protectedRoute';

const SleepingHours = () => {
    const [getInBedTime, setGetInBedTime] = useState('');
    const [wakeUpTime, setWakeUpTime] = useState('');
    const axiosPrivate  = useAxiosPrivate()
    const router = useRouter();


    const generateTimes = () => {
        const times = [];
        for (let i = 0; i < 24; i++) {
            const hour12 = i % 12 === 0 ? 12 : i % 12; 
            const ampm = i < 12 ? 'AM' : 'PM'; 
            times.push(`${hour12}:00 ${ampm}`, `${hour12}:30 ${ampm}`); 
        }
        return times;
    };

    const times = generateTimes();

    const handleChange = (event, setTime) => {
        setTime(event.target.value);
    };

    const convertTo24HourFormat = (time) => {
        const [timePart, period] = time.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);

        if (period === 'PM' && hours < 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    };

    const handleNext = async () => {
        const getInBedTimeFormatted = convertTo24HourFormat(getInBedTime);
        const wakeUpTimeFormatted = convertTo24HourFormat(wakeUpTime);
        try {
            const response = await axiosPrivate.post('updateuserinfo/', {
                getInBed: getInBedTimeFormatted, 
                wakeUp: wakeUpTimeFormatted      
            });
            if (response.status === 200) {
                router.push('steps');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={classes.pageContainer}>
            <main className={classes.main}>
            <h1>Tell us your sleeping hours</h1>
            <div className={classes.getInBedDiv}>
                <label>
                    Get in Bed
                </label>
                <select
                    id="getInBedTime"
                    value={getInBedTime}
                    onChange={(e) => handleChange(e, setGetInBedTime)}
                >
                    <option value="" disabled>Select Time</option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div className={classes.wakeupDiv}>
                <label>
                    Wake Up
                </label>
                <select
                    id="wakeUpTime"
                    value={wakeUpTime}
                    onChange={(e) => handleChange(e, setWakeUpTime)}
                >
                    <option value="" disabled>Select Time</option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
                <button type = 'submit' className={classes.btn} onClick={handleNext}>Next</button>
                <button className={classes.skipBtn} onClick={()=>router.push("/userInfo/steps")}>Skip</button>
            </div>
            </main>
        </div>
    );
};

export default protectedRoutes(SleepingHours);
