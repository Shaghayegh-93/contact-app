import "./App.css";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/contactList/ContactList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import ContactDetail from "./components/ContactDetail/ContactDetail";
import EditContact from "./components/EditContact/EditContact";

function App() {
  return (
    <main className="App">
      <h1>Contact App</h1>
      <ToastContainer />

      <Switch>
        <Route path="/edit/:id" component={EditContact} />
        <Route path="/user/:id" component={ContactDetail} />
        <Route path="/" exact component={ContactList} />
        <Route path="/add" component={AddContact} />
      </Switch>
    </main>
  );
}

export default App;
