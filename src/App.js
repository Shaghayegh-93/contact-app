import { useEffect, useState } from "react";
import "./App.css";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/contactList/ContactList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [contactList, setContactList] = useState([]);
  const addContactHandler = (contact) => {
    if (!contact.name || !contact.email) {
      toast.warning("all fildes are mandatory!");
      return;
    }

    setContactList([
      ...contactList,
      { id: Math.ceil(Math.random() * 100), ...contact },
    ]);
  };
  const deleteContactHandler = (id) => {
    const filteredContacts = contactList.filter((contact) => contact.id !== id);
    setContactList(filteredContacts);
  };

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contactList"));
    if (savedContacts) setContactList(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contactList", JSON.stringify(contactList));
  }, [contactList]);
  return (
    <main className="App">
      <h1>Contact App</h1>
      <ToastContainer />
      <AddContact addContactHandler={addContactHandler} />

      <ContactList contactList={contactList} onDelete={deleteContactHandler} />
    </main>
  );
}

export default App;
