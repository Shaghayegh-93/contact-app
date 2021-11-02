import { useEffect, useState } from "react";
import "./App.css";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/contactList/ContactList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import routes from "./routes";
import { Route, Switch } from "react-router-dom";
import ContactDetail from "./components/ContactDetail/ContactDetail";
import getContacts from "./services/getContactService";
import deleteContact from "./services/deleteContactService";
import addContacts from "./services/addContactService";
import EditContact from "./components/EditContact/EditContact";
import updateContact from "./services/updateContact";

function App() {
  const [contactList, setContactList] = useState([]);
  const addContactHandler = async (contact) => {
    if (!contact.name || !contact.email) {
      toast.warning("all fildes are mandatory!");
      return;
    }
    try {
      const { data } = await addContacts(contact);
      setContactList([...contactList, data]);
    } catch (error) {}
  };
  const editContactHandler = async (contact, id) => {
    try {
      await updateContact(id, contact);
      const { data } = await getContacts();
      setContactList(data);
    } catch (error) {}
  };
  const deleteContactHandler = async (id) => {
    try {
      await deleteContact(id);
      const filteredContacts = contactList.filter(
        (contact) => contact.id !== id
      );
      setContactList(filteredContacts);
    } catch (error) {}
  };

  useEffect(() => {
    
    const fetchContacts = async () => {
      const { data } = await getContacts();
      setContactList(data);
    };
    try {
      fetchContacts();
    } catch (error) {}
  }, []);

  return (
    <main className="App">
      <h1>Contact App</h1>
      <ToastContainer />
      {/* <AddContact addContactHandler={addContactHandler} /> */}

      {/* <ContactList contactList={contactList} onDelete={deleteContactHandler} /> */}
      <Switch>
        <Route
          path="/edit/:id"
          render={(props) => (
            <EditContact editContactHandler={editContactHandler} {...props} />
          )}
        />
        <Route path="/user/:id" component={ContactDetail} />
        <Route
          path="/"
          exact
          render={() => (
            <ContactList
              contactList={contactList}
              onDelete={deleteContactHandler}
            />
          )}
        />
        <Route
          path="/add"
          render={(props) => (
            <AddContact addContactHandler={addContactHandler} {...props} />
          )}
        />
      </Switch>
    </main>
  );
}

export default App;
