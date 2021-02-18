import React, { useEffect, useState } from "react"
import "./ContactForm.css"

const ContactForm = (props) => {
    const [contactDetails, setContactDetails] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        type: "",
        isEdit: false
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!contactDetails.isEdit) {
            const data = {
                name: contactDetails.name,
                email: contactDetails.email,
                phone: contactDetails.phone,
                type:contactDetails.type,               
                isEdit: contactDetails.isEdit
            }
            props.postData(data)
        } else {
            const data = {
                id:contactDetails.id,
                name: contactDetails.name,
                email: contactDetails.email,
                phone: contactDetails.phone,
                type:contactDetails.type,               
                isEdit: contactDetails.isEdit
            }
            props.postData(data)
        }
        setContactDetails({
            id: "",
            name: "",
            email: "",
            phone: "",
            type:"",
            isEdit: false
        })
    }


    useEffect(() => {
        setContactDetails({
            id: props.editData._id,
            name: props.editData.name,
            email: props.editData.email,
            phone: props.editData.phone,
            type: props.editData.type,
            isEdit: true
        })
    }, [props.editData])

    useEffect(()=>{
        setContactDetails({
            id: props.editData._id,
            name: props.editData.name,
            email: props.editData.email,
            phone: props.editData.phone,
            type: props.editData.type,
            isEdit: false
        })
    },[])


    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h1>Add Contact</h1>
            <input className="input" type="text" placeholder="Name" value={contactDetails.name} onChange={e => setContactDetails({ ...contactDetails, name: e.target.value })} required/><br />
            <input className="input" type="email" placeholder="Email" value={contactDetails.email} onChange={e => setContactDetails({ ...contactDetails, email: e.target.value })} /><br />
            <input className="input" type="text" placeholder="Phone" value={contactDetails.phone} onChange={e => setContactDetails({ ...contactDetails, phone: e.target.value })} required/><br />
            <h3 className="contact-type-header">Contact Type</h3>
            <div className="radio-container">
                <div className="radio-btn">
                    <input type="radio" checked={contactDetails.type == "Personal"} value="Personal" name="type" onChange={e => setContactDetails({ ...contactDetails, type: e.target.value })} />
                    <label>Personal</label>
                </div>
                <div className="radio-btn">
                    <input type="radio" checked={contactDetails.type == "Professional"} name="type" value="Professional" onChange={e => setContactDetails({ ...contactDetails, type: e.target.value })} />
                    <label>Professional</label>
                </div>
            </div>
            <button type="submit" className="add-contact-btn">{contactDetails.isEdit ? "Edit Contact" : "Add Contact"}</button>
        </form>
    )
}

export default ContactForm