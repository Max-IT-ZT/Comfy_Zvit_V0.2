import { Field, Form, Formik } from "formik";
import { useId } from "react";
import css from "./PlanForm.module.css";

export default function PlanForm({ newPlan, setDay, day, plan }) {
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
    <div>
      <Formik
        enableReinitialize
        initialValues={{ hs: "", it: "", day: day }}
        onSubmit={handleSave}
      >
        {({ handleSubmit }) => (
          <Form className={css.form} onSubmit={handleSubmit}>
            <Field
              className={css.input}
              onChange={handleDayChange}
              type="number"
              name="day"
              id={dayId}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="День"
            />
            <Field
              className={css.input}
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="it"
              id={itId}
              placeholder="Введіть суму іт-сервісів"
            />
            <Field
              className={css.input}
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="hs"
              id={hsId}
              placeholder="Введіть суму хеппі-сервісу"
            />
            <button className={css.formBtn} type="submit">
              Зберігти
            </button>
          </Form>
        )}
      </Formik>
      <ul className={css.planList}>
        <li className={css.header}>
          <span className={css.itemSpan}>День</span>
          <span className={css.itemSpan}>План ІТ</span>
          <span className={css.itemSpan}>План ХС</span>
        </li>
        {plan.map((p, index) => (
          <li key={index} className={css.planItem}>
            <span className={css.itemSpan}>{p.day}</span>
            <span className={css.itemSpan}>{`${p.it} грн.`}</span>
            <span className={css.itemSpan}>{`${p.hs} грн.`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
