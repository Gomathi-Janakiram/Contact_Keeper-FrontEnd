import React, { useState } from "react"
import "./Login.css"
import M from "materialize-css"
import {useHistory} from "react-router-dom"
import {userContext} from "../../App"


const Login = () => {
    const {state,dispatch}=React.useContext(userContext)
    const history=useHistory()
    const [details, setDetails] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("https://secret-sands-53281.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: details.email,
                password: details.password
            })
        })
            .then(data => {
                return data.json()
            }).then(res => {
                console.log(res)
                if (res.error) {
                    M.toast({ html: res.error, classes: "danger toast" })
                } else {
                   localStorage.setItem("token",res.token)
                   localStorage.setItem("user",JSON.stringify(res.user))
                   dispatch({type:"USER",payload:res.user})
                   M.toast({html:"Logged In Successfully",classes:"success toast"})
                   history.push("/")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="login-container">
            <h1 className="login-header">Account <span className="login">Login</span></h1>
            <form>
                <label className="label">Email Address</label><br />
                <input type="text" value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} /><br />

                <label className="label">Password</label><br />
                <input type="password" value={details.password} onChange={e => setDetails({ ...details, password: e.target.value })} />
            </form>
            <button onClick={handleSubmit} className="login-btn">Login</button>
        </div>
    )
}

export default Login




// 

//                    
