import { Field, Form, Formik } from "formik";
import { useId } from "react";
import css from "./PlanForm.module.css";
export default function PlanForm({ newPlan, setDay, day }) {
  console.log("day: ", day);
  const itId = useId();
  const hsId = useId();
  const dayId = useId();

  const handleDayChange = (event) => {
    setDay(parseInt(event.target.value, 10));
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{ hs: "", it: "", day: day }}
      onSubmit={(value, actions) => {
        setDay(day + 1);
        newPlan(value);
        actions.resetForm();
      }}
    >
      <Form className={css.Form}>
        <Field onChange={handleDayChange} type="number" name="day" id={dayId} />
        <Field
          type="number"
          name="it"
          id={itId}
          placeholder="Введіть суму іт-сервісів"
        />
        <Field
          type="number"
          name="hs"
          id={hsId}
          placeholder="Введіть суму хеппі-сервісу"
        />
        <button type="submit">Зберігти</button>
      </Form>
    </Formik>
  );
}
