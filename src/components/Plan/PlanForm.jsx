import { Field, Form, Formik } from "formik";
import { useId } from "react";
import css from "./PlanForm.module.css";

export default function PlanForm({ newPlan, setDay, day }) {
  const itId = useId();
  const hsId = useId();
  const dayId = useId();

  const handleDayChange = (event) => {
    const value = event.target.value.trim();
    if (value === "") {
      setDay(""); // Залишити порожнім, якщо введено пустий рядок
    } else {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        setDay(intValue); // Встановити день, якщо введено числове значення
      }
    }
  };

  const handleSave = (values, actions) => {
    // Зберігання плану зі збільшенням дня на 1
    newPlan(values);
    setDay(day + 1);
    actions.resetForm();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ hs: "", it: "", day: day }}
      onSubmit={handleSave}
    >
      {({ handleSubmit }) => (
        <Form className={css.Form} onSubmit={handleSubmit}>
          <Field
            onChange={handleDayChange}
            type="number"
            name="day"
            id={dayId}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="День"
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
