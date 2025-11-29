import React, { useEffect, useRef, useState } from 'react'
import { BiSolidHide } from "react-icons/bi";
import { IoCopy } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
const View = () => {
    const input = useRef([]) ;
    const [search , setSearch] = useState("") ;
    const [visible , setVisible] = useState(false) ;
    const [arr,setArr] = useState([]) ; 
    useEffect(()=>{
        async function fetchData() {
            try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/`, { withCredentials: true }) ;
            setArr(res.data.todos)
            
        } catch (error) {
            console.log(error) ;
            toast.error("Fetching Failed Reload") ;
        }
        } 
        fetchData() ; 
    } , [arr]) ;
    useEffect(()=>{
    if(!localStorage.getItem("login")) {
        navigate('/login') ;
    }
  })
const data = search ?[...arr].filter((i) => i.name.includes(search) ) : arr ;
  return (
    <div>
        <div>
            <input onChange={(e)=>setSearch(e.target.value)} 
            type='text' placeholder='search . . .' value={search} />
        </div>
        {data.map((items , index)=>{
            return <div key={items.password}>
                <h4>{index+1}. {items.name}</h4>
                <div className='password'>
                    <input ref={el => input.current[index] = el} type={`${visible === index  ? "text" : "password"}`}  defaultValue={items.password}  />
                    <div onClick={()=>{
                        console.log("clicked")
                        console.log(visible)
                        setVisible(index) ;
                    }}><BiSolidHide /></div>
                    
                </div><br />
                <button style={{backgroundColor:"green" , color:"black"}}
                onClick={async()=>{
                    await navigator.clipboard.writeText(input.current[index].defaultValue) ;
                    toast.success("copied") ;
                }}
                >copy</button><Toaster/>
                </div> 
        })}
      
    </div>
  )
}

export default View
