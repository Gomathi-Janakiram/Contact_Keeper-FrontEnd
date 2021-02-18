import React from "react"
import "./Contacts.css"
import Searchbar from "../SearchBar/Searchbar"

const Contacts = (props) => {
    const getSearchTerm=props.getSearchTerm
    return (
        <>
            <div className="contacts">
                <Searchbar getSearchTerm={getSearchTerm}/>
                {props.data.length>0 ? props.data.map(item => (
                    <div key={item._id} className="contacts-container">
                        <div className="name-contact-type">
                            <h3>{item.name}</h3>
                            <h3>{item.type}</h3>
                        </div>
                        <div className="email-phone">
                            <div>{item.email}</div>
                            <div>{item.phone}</div>
                        </div>

                        <div className="edit-delete">
                            <button onClick={()=>props.getEditData(item)}>Edit</button>
                            <button onClick={()=>props.deleteData(item)}>Delete</button>
                        </div>
                    </div>
                )) : <h2 style={{color:"black",marginLeft:"10%"}}>No Contacts.....</h2>
                }
            </div>
        </>
    )
}

export default Contacts