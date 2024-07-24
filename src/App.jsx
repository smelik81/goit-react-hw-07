import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { fetchContacts } from "./redux/contactsOps";
import {
  selectFilteredContacts,
  selectError,
  selectLoading,
} from "./redux/contactsSlice";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactFilter from "./components/ContactFilter/ContactFilter";

function App() {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ContactForm />
        <ContactFilter />
        {contacts.length > 0 && <ContactList />}
      </div>
    </>
  );
}

export default App;
