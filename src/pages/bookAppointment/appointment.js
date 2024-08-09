import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/router';
import classes from '@/styles/appointment.module.css';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

 

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  const axiosPrivate = useAxiosPrivate()

  const router = useRouter();

  useEffect(() => {
    const { doctorId } = router.query; 
    if (doctorId) {
      setDoctorId(doctorId);
    }

    const start = new Date(date);
    start.setHours(9, 0, 0);
    const end = new Date(date);
    end.setHours(17, 0, 0);
    setAvailableTimes(generateTimeSlots(start, end));
  }, [date, router.query]);

  const handleDateChange = (newDate) => setDate(newDate);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAttachmentsChange = (e) => setAttachments(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      alert('No doctor selected.');
      return;
    }

    const formData = new FormData();
    formData.append('doctor', doctorId);
    formData.append('appointment_date', date.toISOString().split('T')[0]);
    formData.append('appointment_time', time);
    formData.append('title', title);
    formData.append('description', description);
    for (let file of attachments) {
      formData.append('attachments', file);
    }

    try {
      const response = await axiosPrivate.post('/appointment/', formData);
      console.log('Appointment booked:', response.data);
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error.response ? error.response.data : error.message);
      alert('Failed to book appointment.');
    }
  };

  return (
    <div className={classes.container}>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="appointment-date" className={classes.label}>Appointment Date</label>
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileDisabled={({ date, view }) => {
              return date.getDay() === 0 || date.getDay() === 6;
            }}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="appointment-time" className={classes.label}>Appointment Time</label>
          <select value={time} onChange={handleTimeChange} className={classes.select}>
            <option value="" disabled>Select Time</option>
            {availableTimes.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>{timeSlot}</option>
            ))}
          </select>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="appointment-title" className={classes.label}>Title</label>
          <input
            type="text"
            id="appointment-title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Routine Check-up, Consultation, etc."
            required
            className={classes.input}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="appointment-description" className={classes.label}>Description</label>
          <textarea
            id="appointment-description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Discuss test results, Follow-up on treatment, etc."
            required
            className={classes.textarea}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="appointment-attachments" className={classes.label}>Attachments</label>
          <input
            type="file"
            id="appointment-attachments"
            multiple
            onChange={handleAttachmentsChange}
            accept=".pdf,.jpg,.png,.docx"
            className={classes.input}
          />
        </div>
        <button type="submit" className={classes.button}>Done</button>
      </form>
    </div>
  );
};

const generateTimeSlots = (start, end) => {
  const times = [];
  let current = new Date(start.getTime());
  while (current <= end) {
    times.push(current.toTimeString().split(' ')[0].substring(0, 5));
    current.setMinutes(current.getMinutes() + 30);
  }
  return times;
};

export default BookAppointment;
