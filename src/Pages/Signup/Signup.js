import React, { useState } from "react"
import "./Signup.css"
import M from "materialize-css"
import { useHistory } from "react-router-dom";

const Signup = () => {
    const history=useHistory()
    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSignup = () => {
        fetch("https://secret-sands-53281.herokuapp.com/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: details.name,
                email: details.email,
                password: details.password
            })
        }).then(data => {
            return data.json()
        }).then(res => {
            if(res.error){
                M.toast({html:res.error,classes:"toast danger"})
            }
            console.log(res)
            history.push("/login")
        })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="signup-container">
            <h1 className="signup-header">Account <span className="signup">Signup</span></h1>
            <form>
                <label className="label">Name</label><br />
                <input type="text" onChange={e => setDetails({ ...details, name: e.target.value })} /><br />

                <label className="label">Email Address</label><br />
                <input type="text" onChange={e => setDetails({ ...details, email: e.target.value })} /><br />

                <label className="label">Password</label><br />
                <input type="password" onChange={e => setDetails({ ...details, password: e.target.value })} />
            </form>
            <button onClick={handleSignup} className="signup-btn">Signup</button>

        </div>
    )
}

export default Signup