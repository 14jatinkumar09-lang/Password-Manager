import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function Login() {

    const navigate = useNavigate();
    const [btnLoad, setBtnLoad] = useState(false);

    const [userData, setUserData] = useState({
        userName: "",
        password: ""
    });

    function onChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        if (!userData.userName || !userData.password) {
            toast.dismiss() ;
            toast.error("Enter username / password");
            return;
        }

        try {
            setBtnLoad(true);
            const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, userData, { withCredentials: true });
            localStorage.setItem("login" , true) ;
toast.dismiss() ;
            toast.success(res.data.responseData.message);
            navigate("/");
            setBtnLoad(false);

        } catch (error) {
            setBtnLoad(false);
            toast.dismiss() ;
            toast.error(error.response.data.msg || "Login Failed! Check Internet.");
            console.log(error)
        }
    }

  useEffect(()=>{
    if(localStorage.getItem("login")) {
        navigate('/') ;
    }
  })

   return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // background: "#0f0f0f",           // Dark background
        fontFamily: "Arial, sans-serif"
    }}>

        <div style={{
            width: "380px",
            padding: "25px",
            border: "1.5px solid #333",
            borderRadius: "10px",
            background: "#1b1b1b",        // Dark card box
            boxShadow: "0px 4px 15px rgba(0,0,0,0.4)",
            textAlign: "center",
            color: "white"
        }}>

            <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "7px", color:"#fff" }}>Welcome Back</h1>

            <p style={{ fontSize: "14px", color: "#c9c9c9", marginBottom: "18px" }}>
                Enter your credentials to access your account
            </p>

            {/* Centered Inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "20px" }}>
                <InputBox
                    name="userName"
                    value={userData.userName}
                    onKeyDown={(e) => e.key === "Enter" && loginUser()}
                    onChange={onChange}
                    type="text"
                    placeholder="you@example.com"
                    label="UserName"
                />

                <InputBox
                    name="password"
                    value={userData.password}
                    onKeyDown={(e) => e.key === "Enter" && loginUser()}
                    onChange={onChange}
                    type="password"
                    placeholder="••••••••"
                    label="Password"
                />
            </div>

            <div style={{ marginTop: "25px", marginBottom: "10px" }}>
                {btnLoad === false ?
                    <button
                        onClick={loginUser}
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
                        Login
                    </button>
                    :
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
                }

                <Toaster />
            </div>

            <p style={{ fontSize: "14px", marginTop: "15px", color:"#e2e2e2" }}>
                Don't have an account?
                <button onClick={() => navigate('/signup')}
                    style={{
                        border: "none",
                        background: "none",
                        color: "#60a5fa",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginLeft: "4px"
                    }}>
                    Sign Up
                </button>
            </p>

        </div>
    </div>
);
}
