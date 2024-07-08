import { Formik, Form, Field } from "formik";
import css from "./UserForm.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

export default function UserForm({ plan }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const calculatePercentage = (actual, plan) => {
    return ((actual / plan) * 100 - 100).toFixed(1);
  };

  const handleSubmitForm = (values, actions) => {
    const { sumIt, sumHs, percentageIt, percentageHs, phone, tv, pc } = values;

    const todayPlan = plan.find((item) => item.day === 1);

    if (todayPlan) {
      const percentageItValue = calculatePercentage(sumIt, todayPlan.it);
      const percentageHsValue = calculatePercentage(sumHs, todayPlan.hs);

      let modalMessage = `Житомир\n`;
      modalMessage += `ІТ ${sumIt}/${todayPlan.it} (${percentageItValue}%)`;
      if (percentageIt) {
        modalMessage += `\nЧастка: ${percentageIt}%`;
      }
      modalMessage += `\nХС ${sumHs}/${todayPlan.hs} (${percentageHsValue}%)`;
      if (percentageHs) {
        modalMessage += `\nЧастка: ${percentageHs}%`;
      }
      if (phone) {
        modalMessage += `\nСмарт ${phone}`;
      }
      if (tv) {
        modalMessage += `\nТВ ${tv}`;
      }
      if (pc) {
        modalMessage += `\nНоут ${pc}`;
      }

      setModalContent(modalMessage);
      setModalOpen(true);
    }

    actions.resetForm();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          sumIt: "",
          sumHs: "",
          percentageIt: "",
          percentageHs: "",
          phone: "",
          tv: "",
          pc: "",
        }}
        onSubmit={handleSubmitForm}
      >
        {() => (
          <Form className={css.form}>
            <Field
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="sumIt"
              placeholder="Сума ІТ"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="decimal"
              pattern="[0-9]*"
              name="percentageIt"
              placeholder="Частка ІТ"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="sumHs"
              placeholder="Сума ХС"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="decimal"
              pattern="[0-9]*"
              name="percentageHs"
              placeholder="Частка ХС"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="phone"
              placeholder="Кількість Смартфонів"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="tv"
              placeholder="Кількість Телевізорів"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              name="pc"
              placeholder="Кількість Ноутбуків"
              className={css.input}
            />
            <button className={css.formBtn} type="submit">
              Відправити
            </button>
          </Form>
        )}
      </Formik>

      <Modal isOpen={modalOpen} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
