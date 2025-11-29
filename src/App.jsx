import { useState, useRef , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { IoCopy } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

import { Routes , Route , BrowserRouter } from "react-router-dom"
import View from './View';
import { useNavigate } from 'react-router-dom';
function App() {

   const navigate = useNavigate() ;
   const [arr,setArr] = useState([]) ;
   const [loading , setLoading] = useState(false) ;


  
  


  const display = useRef(null);
  const btn = useRef(null);
  const [input, setInput] = useState("");
  const [data, setData] = useState({
    range: 20,
    number: false,
    character: false
  });

  // console.log(display)
  function onChange(e) {
    if (e.target.type === "checkbox") {
      setData({ ...data, [e.target.name]: e.target.checked })
      // display ? display.current.innerText = generate()  : "" ;

      return;
    }
    display ? display.current.innerText = generate() : "";
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const generate = () => {
    // btn.current.style.color = "white"
    let alpha = "abcdefghijklmnopqrstuvwxyz".split("");

    if (data.number === true) {
      alpha = [...alpha, ..."123456789".split("")]
    }
    if (data.character === true) {
      alpha = [...alpha, ..."!@#$%^&*().,_?/<>-_=+".split("")]
    }

    let password = "";
    for (let i = 0; i <= data.range; i++) {
      password = password + alpha[Math.floor(Math.random() * alpha.length)]
    }

    return password;

  }
useEffect(()=>{
    if(!localStorage.getItem("login")) {
        navigate('/login') ;
    }
  })
  return (
    <>
      <div>
        <input onChange={(e) => setInput(e.target.value)} name='nameInput' type='text' placeholder='name' value={input} /> <br /><br />
        <div className='display'> <div ref={display}  ></div>
          <div ref={btn}
            onClick={async (e) => {
              await navigator.clipboard.writeText(display.current.innerText);
              btn.current.style.color = "green"
              setTimeout(() => btn.current.style.color = "white", 4000)
              toast.success("copied")
            }} >
            <IoCopy />
          </div>  <br />
        </div>

        <input onChange={onChange} type='range' name='range' min={8} max={30} value={data.range} /><br />


        <label htmlFor='numbers'>Numbers</label>
        <input onClick={onChange} id='numbers' type='checkbox' name='number' value={data.number} /><br />


        <label htmlFor='characters'>Characters</label>
        <input onClick={onChange} id='characters' type='checkbox' name='character' value={data.character} /><br /><br />


        <button onClick={() => { display ? display.current.innerText = generate() : ""; }} >Generate Password</button><br /><br />




        {loading ? 
<button className="btn">
  <span className="loading loading-spinner"></span>
  loading...
</button> : <button onClick={async() => {
          if (input === "" || display.current.innerText ==="") return toast.error("Enter a Name / Generate Password");
          setLoading(true) ;
          try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/addTodo` , {name:input , password:display.current.innerText},{ withCredentials: true })
            toast.success(  res?.data?.msg ||"Password Saved") ;
            setLoading(false) ;
          } catch (error) {
            toast.dismiss() ;
            toast.error(  error?.response?.data?.msg ||"Password Not Saved") ;
            console.log(error)
            setLoading(false) ;
          }
          
        }} >Save Password</button>}
        <br /><br />

        <div onClick={()=>{
          navigate('/viewPassword' , {
            state : {
              arr : arr
            }
          }) ;
        }}>view all saved passwords . . .</div>
        <br/><br/><br/><br/><br/><br/>

        <button onClick={()=>{
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          localStorage.removeItem("login");
          navigate('/login') ;
          alert("Logout Successfull")
        }}
        style={{
         background: "#d32f2f",
        color: "white",
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        fontSize: "15px",
        cursor: "pointer",
        fontWeight: "600",
        
        }}
        >Logout</button>
      </div><Toaster />
      
  

    </>
     
  )
}
export default App
