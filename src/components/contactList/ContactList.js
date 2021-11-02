import { Link } from "react-router-dom";
import "./contactList.css";
import Contact from "./Contact/Contact";

const ContactList = ({ contactList, onDelete }) => {
  return (
    <section className="listWrapper">
      <div className="contactList">
        <div className="listHeader">
          <h2>Contacts</h2>
          <Link to="/add">
            <button>Add</button>
          </Link>
        </div>
        {contactList.map((contact) => {
          return (
            <Contact
              key={contact.id}
              contact={contact}
              onDelete={() => onDelete(contact.id)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ContactList;
