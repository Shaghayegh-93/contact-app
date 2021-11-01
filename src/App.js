import { useEffect, useState } from "react";
import "./App.css";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/contactList/ContactList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import routes from "./routes";
import { Route, Switch } from "react-router-dom";
import ContactDetail from "./components/ContactDetail/ContactDetail";

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
      {/* <AddContact addContactHandler={addContactHandler} /> */}

      {/* <ContactList contactList={contactList} onDelete={deleteContactHandler} /> */}
      <Switch>
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
        {/* {routes.map((route, index) => (
          <Route {...route} key={index} />
        ))} */}
      </Switch>
    </main>
  );
}

export default App;
