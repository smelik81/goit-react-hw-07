import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import { useDispatch } from "react-redux";
import { useId, useRef } from "react";
import { addContacts } from "../../redux/contactsOps";

const validationInputSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Min 3 symbols")
    .max(50, "Max 50 symbols")
    .required("required"),
  number: Yup.string().min(9).required("required"),
});

const initialValues = {
  name: "",
  number: "",
};

const InputWithMask = ({ field, ...props }) => {
  const inputRef = useRef(null);
  return <InputMask {...field} {...props} ref={inputRef} />;
};

export default function ContactForm() {
  const nameFormId = useId();
  const numberFormId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContacts({
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationInputSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.formWrapper}>
        <div className={css.container}>
          <label className={css.label} htmlFor={nameFormId}>
            Name
          </label>
          <Field
            className={css.input}
            id={nameFormId}
            type="text"
            name="name"
          />
          <ErrorMessage name="name" component="span" />
        </div>
        <div className={css.container}>
          <label className={css.label} htmlFor={numberFormId}>
            Number
          </label>
          <Field
            className={css.input}
            id={numberFormId}
            type="number"
            name="number"
          >
            {({ field }) => (
              <InputWithMask
                className={css.inputMask}
                field={field}
                mask="999-99-99"
                maskChar={null}
              />
            )}
          </Field>
          <ErrorMessage name="number" component="span" />
        </div>
        <button className={css.formButton} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
