import React,{useContext} from "react"
import { Link, useHistory } from "react-router-dom"
import "./Navbar.css"
import { userContext } from "../../App"


const Navbar = () => {
    const history = useHistory()
    const { state, dispatch } = useContext(userContext)
    const renderList = () => {
        if (!state) {
            return [
                <div className="right">
                    <Link to="/signup">
                        Signup
                    </Link>
                    <Link to="/login">
                        Login
                    </Link>
                </div>
            ]
        } else {
            return [
                <div className="right">
                    <p style={{ color: "white" }}>Hello {state.name}</p>
                    <p>
                        <button className="logout"
                            onClick={
                                () => {
                                    localStorage.clear()
                                    dispatch({ type: "CLEAR" })
                                    history.push("/login")
                                }
                            }>
                            Logout
                    </button>
                    </p>
                </div>
            ]
        }
    }
    return (
        <div className="navbar-container">
            <div className="left">
                <i className="fas fa-id-card-alt fa-2x"></i>
                <h1>Contact Keeper</h1>
            </div>
            {renderList()}
        </div>
    )
}

export default Navbar