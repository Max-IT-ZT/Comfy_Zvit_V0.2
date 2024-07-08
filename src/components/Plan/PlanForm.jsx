import { Field, Form, Formik } from "formik";
import { useId } from "react";
import css from "./PlanForm.module.css";

export default function PlanForm({ newPlan, setDay, day }) {
  const itId = useId();
  const hsId = useId();
  const dayId = useId();

  const handleDayChange = (event, setFieldValue) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setDay(value);
      setFieldValue("day", value);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ hs: "", it: "", day: day }}
      onSubmit={(values, actions) => {
        newPlan(values);
        setDay(day + 1);
        actions.resetForm({
          values: { ...values, hs: "", it: "", day: day + 1 },
        });
      }}
    >
      {({ setFieldValue }) => (
        <Form className={css.Form}>
          <Field
            type="number"
            name="day"
            id={dayId}
            value={day}
            onChange={(event) => handleDayChange(event, setFieldValue)}
          />
          <Field
            type="tel"
            name="it"
            id={itId}
            placeholder="Введіть суму іт-сервісів"
          />
          <Field
            type="tel"
            name="hs"
            id={hsId}
            placeholder="Введіть суму хеппі-сервісу"
          />
          <button type="submit">Зберігти</button>
        </Form>
      )}
    </Formik>
  );
}
