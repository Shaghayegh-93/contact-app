import { useState } from "react";
import "./addContact.css"

const AddContact = ({addContactHandler,history}) => {
  const [contact, setContact] = useState({ name: "", email: "" });
  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    addContactHandler(contact);
    setContact({ name: "", email: "" })
    history.push("/");
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="formControl">
        <label>name</label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={changeHandler}
        ></input>
      </div>
      <div className="formControl">
        <label>email</label>
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={changeHandler}
        ></input>
      </div>
      <button type="submit" >Add Contact</button>
    </form>
  );
};

export default AddContact;
