import { useEffect, useState } from "react";
import getOneContact from "../../services/getOneContact"
// import "./addContact.css";

const EditContact = ({ editContactHandler, history,match }) => {
  const [contact, setContact] = useState({ name: "", email: "" });
  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    editContactHandler(contact,match.params.id);
    setContact({ name: "", email: "" });
    history.push("/");
  };
  useEffect(() => {
    const localFetch = async () => {
      try {
     const{data} = await getOneContact(match.params.id);
     setContact({name:data.name,email:data.email})
      } catch (error) {}
    };
    localFetch();
  }, []);

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
      <button type="submit">Edit Contact</button>
    </form>
  );
};
export default EditContact;
