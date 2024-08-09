import { useState } from 'react';
import classes from '@/styles/otpVerification.module.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className={classes.container}>
      <h2>OTP Verification</h2>
      <p>We will send OTP to your email id</p>
      <div className={classes.otpContainer}>
        {otp.map((data, index) => {
          return (
            <input
              className={classes.otpInput}
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={e => handleChange(e.target, index)}
              onFocus={e => e.target.select()}
            />
          );
        })}
      </div>
      <button
        className={classes.submitButton}
        onClick={() => alert("Entered OTP is " + otp.join(""))}
      >
        Verify OTP
      </button>
      <button className={classes.resendBtn}>Resend</button>
    </div>
  );
};

export default OtpVerification;