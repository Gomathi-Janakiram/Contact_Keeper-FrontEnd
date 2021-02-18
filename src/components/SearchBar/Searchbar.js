import React, { useState } from "react"
import "./Searchbar.css"

const Searchbar=(props)=>{
    const [searchTerm,setSearchTerm]=useState("")

    props.getSearchTerm(searchTerm)

    return(
        <form>
            <input className="find-contact" type="text" placeholder="Filter Contacts...." onChange={e=>setSearchTerm(e.target.value)}/>
        </form>
    )
}

export default Searchbar