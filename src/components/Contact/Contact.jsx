import css from "./Contact.module.css";
import { BsPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteContacts } from "../../redux/contactsOps";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  const handleOnDelete = (contactId) => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <div className={css.container}>
      <li>
        <div className={css.contactcontactInfo}>
          <BsPersonFill size={20} />
          <h2 className={css.h2}>{name}</h2>
        </div>
        <div className={css.contactPhone}>
          <BsFillTelephoneFill size={20} />
          <p className={css.p}>{number}</p>
        </div>
      </li>
      <button className={css.buttonContact} onClick={() => handleOnDelete(id)}>
        Delete
      </button>
    </div>
  );
}
