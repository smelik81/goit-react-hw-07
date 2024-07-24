import { useDispatch, useSelector } from "react-redux";
import css from "./ContactFilter.module.css";
import { useId } from "react";
import { selectFilters } from "../../redux/filterSlice";
import { phoneFilter } from "../../redux/filterSlice";

export default function SearcBox() {
  const inputId = useId();

  const name = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handleInputChange = ({ target: { value } }) => {
    dispatch(phoneFilter(value));
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <label htmlFor={inputId} className={css.label}>
          Find contacts by name
        </label>
        <input
          id={inputId}
          type="text"
          className={css.input}
          value={name}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
