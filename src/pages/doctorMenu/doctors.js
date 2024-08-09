import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import axios from '../api/axios';
import classes from '@/styles/doctors.module.css';

export default function DoctorAppointmentCards() {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const debouncedFetchDoctors = debounce(() => {
            fetchDoctors();
        }, 300);

        debouncedFetchDoctors();

        return () => {
            debouncedFetchDoctors.cancel();
        };
    }, [searchQuery]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/doctorsearch/', {
                params: {
                    name: searchQuery,
                    practiceType: searchQuery
                }
            });
            const data = response.data.results;
            console.log('Fetched doctors:', data);
            setDoctors(data);
        } catch (error) {
            console.log('Error fetching doctors', error);
            setDoctors([]);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleBookAppointment = (doctorId) => {
        router.push(`/bookAppointment/appointment?doctorId=${doctorId}`);
    };

    return (
        <div className={classes.container}>
            <input
                type='text'
                placeholder='Search'
                value={searchQuery}
                onChange={handleSearch}
                className={classes.searchBar}
            />
            <div className={classes.cardContainer}>
                {doctors.length === 0 ? (
                    <p>No doctors found</p>
                ) : (
                    doctors.map((doctor) => (
                        <div key={doctor.id} className={classes.card}>
                            <h2>Dr. {doctor.user_name}</h2>
                            <p>Age: {doctor.age}</p>
                            <p>Gender: {doctor.gender}</p>
                            <p>Qualification: {doctor.qualification}</p>
                            <p>Experience: {doctor.yearsOfExperience} years</p>
                            <p>Practice Type: {doctor.practiceType}</p>
                            <p>Clinic Address: {doctor.clinicAddress}</p>
                            <p>Zip Code: {doctor.clinicZipCode}</p>
                            <button className={classes.button} onClick={() => handleBookAppointment(doctor.id)}>Book appointment</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
