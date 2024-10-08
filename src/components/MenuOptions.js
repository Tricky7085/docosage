import React, { useEffect, useRef} from 'react'
import classes from "@/styles/menu-options.module.css"
import { FaAngleRight } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';


function MenuOptions({showOptions,setShowOptions}) {
   
    const options = ["My Profile","Task","Habits","Add Members","Find Doctor","Find Diagnosis","Order Medication","Notification Settings","Help","Contact Us"]
    const menuRef = useRef()
    const {userAuth,setUserAuth} = useAuth()
    const router = useRouter()
    useEffect(()=>{
        if(showOptions){
            menuRef.current.classList.add(classes.show)
            menuRef.current.classList.remove(classes.hide)
        }
        else{
            menuRef.current.classList.add(classes.hide)
            menuRef.current.classList.remove(classes.show)
        }
    },[showOptions])


    const findDoctor = () => {
        router.push('/dashboard/doctors')
    }

    const handleOptionClick = (e, item) => {
        e.preventDefault();
        setShowOptions(false); 
        switch (item) {
          case 'Logout':
            setUserAuth(null); 
            router.push('/dashboard/login'); 
            break;
          case 'Find Doctor':
            router.push('/doctorMenu/doctors'); 
            break;
          default:
            router.push('/dashboard/login'); 
            break;
        }
      };

    return (
   <main className={classes.main} onClick={(e)=>setShowOptions(false)}>
    <div className={classes.mainDiv} ref={menuRef} onClick={(e)=>{e.stopPropagation()}}>
    <div className={classes.closeButtonDiv}>
        <button type='button' className={classes.closeButton} onClick={()=>setShowOptions(false)}><IoMdClose size={30}></IoMdClose></button>
    </div>
    <div className={classes.infoDiv}>
        <div className={classes.imageAndPointsDiv}>

        </div>
        <div className={classes.nameAndEmailDiv}>
        <h2>{userAuth?.name?userAuth.name:"Guest Account"}</h2>
        <p>{userAuth?.email?userAuth.email:''}</p>
        </div>
    </div>
    <ul className={classes.options}>
        {options.map((item,index)=>{
            return(
                <li key={index} name={options[index]} className={classes.optionWithBorder} onClick={(e)=> handleOptionClick(e, item)} >
                    <p className={classes.optionText}>{item}</p>
                    <FaAngleRight></FaAngleRight>
                </li>
            )
        })}
        <button className={classes.optionWithoutBorder} type='button' name={userAuth?.name?"Logout":"Login"} onClick={handleOptionClick}>{userAuth?.name?"Logout":"Login"} <FaAngleRight></FaAngleRight></button>
    </ul>
    </div>
    
   </main>
  )
}

export default MenuOptions