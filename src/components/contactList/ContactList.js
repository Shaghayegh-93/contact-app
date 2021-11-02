import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import "./contactList.css";
import Contact from "./Contact/Contact";
import getContacts from "../../services/getContactService";
import deleteContact from "../../services/deleteContactService";

const ContactList = (props) => {
  const [contactList, setContactList] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await getContacts();
      setContactList(data);
    };
    try {
      fetchContacts();
    } catch (error) {}
  }, []);
  const deleteContactHandler = async (id) => {
    try {
      await deleteContact(id);
      const filteredContacts = contactList.filter(
        (contact) => contact.id !== id
      );
      setContactList(filteredContacts);
    } catch (error) {}
  };
  return (
    <section className="listWrapper">
      <div className="contactList">
        <div className="listHeader">
          <h2>Contacts</h2>
          <Link to="/add">
            <button>Add</button>
          </Link>
        </div>
        {contactList ? (
          contactList.map((contact) => {
            return (
              <Contact
                key={contact.id}
                contact={contact}
                onDelete={deleteContactHandler}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default ContactList;
