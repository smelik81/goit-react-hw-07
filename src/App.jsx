import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchContacts } from "./redux/contactsOps";
import {
  selectFilteredContacts,
  selectError,
  selectLoading,
} from "./redux/contactsSlice";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactFilter from "./components/ContactFilter/ContactFilter";
import { IoToggle } from "react-icons/io5";

function App() {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [theme, setTheme] = useState("light");
  const toogleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className={`app ${theme}`}>
        <div className="toggleContainer">
          {!isLoading && (
            <IoToggle onClick={toogleTheme} size={32} color="#187418" />
          )}
        </div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div className="content">
            <ContactForm />
            <ContactFilter />
            {contacts.length > 0 && <ContactList />}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
