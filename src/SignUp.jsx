import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { useState , useEffect} from 'react';


export function Signup() {
    const [btnLoad , setBtnLoad] = useState(false) ;
    
    const navigate = useNavigate();

    const [UserData , setUserData] = useState({
        
        userName : "" , 
        
        password : "" ,
        confirmPassword : ""
    })
    function inputOnchange(e) {
        const obj = {} ;
        obj[e.target.name] = e.target.value ;
        setUserData({...UserData , ...obj}) ;
    } 
    // console.log(UserData);
    

    const register = async () => {
        
        if ( UserData.userName == "" || UserData.password == "" || UserData.confirmPassword == "") {
            toast.dismiss() ;
            toast.error("empty fields");
            return;
        }
        if (UserData.password !== UserData.confirmPassword) {
            toast.dismiss() ;
            toast.error("Password and Confirm Password are Not Matching  ")
            return;
        }
        
        try {
                    setBtnLoad(true) ;
                    const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/register`, UserData,{ withCredentials: true })
                    
                    toast.dismiss() ;
                            toast.success(res.data.responseData.message);
                            navigate("/") ;
                            setBtnLoad(false) ;
                        
                    
                } 
                
                catch (error) {

                    setBtnLoad(false) ;
                    toast.dismiss() ;
                        toast.error(error.response.data.msg || "SignUp Failed Check Your Internet Connection");
                        return;
                    
                }



            }
useEffect(()=>{
    const getCookie = (name) => {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="))
            ?.split("=")[1];
    }
if(getCookie("token")) {
    navigate('/') ;
}
    // console.log(document.cookie)
})


    return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // background: "#0f0f0f",
        fontFamily: "Arial, sans-serif"
    }}>

        <div style={{
            width: "380px",
            padding: "25px",
            border: "1.5px solid #333",
            borderRadius: "10px",
            background: "#1b1b1b",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.4)",
            textAlign: "center",
            color: "white"
        }}>

            <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#fff", marginBottom: "6px" }}>Create Account</h1>

            <p style={{ fontSize: "14px", color: "#c9c9c9", marginBottom: "18px" }}>
                Enter your details to create a new account
            </p>

            {/* INPUTS CENTER AND EVEN SPACED */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "20px" }}>

                <InputBox
                    value={UserData.userName}
                    name="userName"
                    label="UserName"
                    type="text"
                    placeholder="UserName OR example@gmail.com"
                    onChange={inputOnchange}
                    onKeyDown={(e) => e.key === "Enter" && register()}
                />

                <InputBox
                    value={UserData.password}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    onChange={inputOnchange}
                    onKeyDown={(e) => e.key === "Enter" && register()}
                />

                <InputBox
                    value={UserData.confirmPassword}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    onChange={inputOnchange}
                    onKeyDown={(e) => e.key === "Enter" && register()}
                />
            </div>

            {/* BUTTON */}
            <div style={{ marginTop: "25px" }}>
                {!btnLoad ? (
                    <button
                        onClick={register}
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "#2563eb",
                            color: "white",
                            borderRadius: "5px",
                            border: "none",
                            fontSize: "15px",
                            cursor: "pointer"
                        }}>
                        Sign Up
                    </button>
                ) : (
                    <button style={{
                        width: "100%",
                        padding: "10px",
                        background: "#3b82f6",
                        color: "white",
                        borderRadius: "5px",
                        fontSize: "15px",
                        border: "none",
                        opacity: 0.85
                    }}>
                        Loading...
                    </button>
                )}
            </div>

            <p style={{ fontSize: "14px", marginTop: "15px", color:"#e2e2e2" }}>
                Already have an account?
                <button
                    onClick={() => navigate('/login')}
                    style={{
                        border: "none",
                        background: "none",
                        color: "#60a5fa",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginLeft: "4px"
                    }}>
                    Sign In
                </button>
            </p>

        </div>

        <Toaster />
    </div>
);

}