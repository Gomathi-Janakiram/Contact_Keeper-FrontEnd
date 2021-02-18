import React, { useEffect, useState } from "react"
import "./Home.css"
import M from "materialize-css"
import ContactForm from "../ContactForm/ContactForm"
import Contacts from "../Contacts/Contacts"

const Home = () => {

    const [dataFromDB, setDataFromDB] = useState([])
    const [editData, setEditData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const postData = (data) => {
        console.log(data)
        if (!data.isEdit) {
            fetch("http://localhost:4000/add", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    type: data.type
                })
            }).then(data => {
                return data.json()
            }).then(res => {
                M.toast({ html: res.message, classes: "toast success" })
                getData()
            })
        } else {
            fetch("http://localhost:4000/edit", {
                method: "put",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    type: data.type
                })
            }).then(res => {
                getData()
            })
        }
    }

    const getEditData = (data) => {
        setEditData(data)
    }

    const getData = () => {
        fetch("http://localhost:4000/contacts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {
                return data.json()
            }).then(res => {
                console.log(res)
                setDataFromDB(res)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteData = (data) => {
        fetch("http://localhost:4000/" + data._id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(data => {
            return data.json()
        }).then(res => {
            M.toast({ html: res.message, classes: "toast danger" })
            getData()
        })
    }


    const filteredCourses = dataFromDB.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) || contact.phone.includes(searchTerm)
    })



    const getSearchTerm = (term) => {
        setSearchTerm(term)
    }


    return (
        <div className="contact-container">
            <ContactForm postData={postData} editData={editData} />
            <Contacts data={filteredCourses} getEditData={getEditData} deleteData={deleteData} getSearchTerm={getSearchTerm} />
        </div>
    )
}

export default Home