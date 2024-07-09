import { useState } from "react";
import { Formik, Form, Field } from "formik";
import css from "./UserForm.module.css";
import Modal from "../Modal/Modal";

export default function UserForm({ plan, onSumItChange }) {
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
        modalMessage += `\n📱 - ${phone}шт.`;
      }
      if (pc) {
        modalMessage += `\n💻 - ${pc}шт.`;
      }
      if (tv) {
        modalMessage += `\n📺 - ${tv}шт.`;
      }

      setModalContent(modalMessage);
      setModalOpen(true);
    }

    actions.resetForm();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSumItChange = (e, handleChange) => {
    handleChange(e);
    onSumItChange(e.target.value);
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
        {({ handleChange }) => (
          <Form className={css.form}>
            <Field
              type="number"
              inputMode="numeric"
              name="sumIt"
              placeholder="Сума ІТ"
              className={css.input}
              onChange={(e) => handleSumItChange(e, handleChange)}
            />
            <Field
              type="number"
              inputMode="decimal"
              name="percentageIt"
              placeholder="Частка ІТ"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              name="sumHs"
              placeholder="Сума ХС"
              className={css.input}
            />

            <Field
              type="number"
              inputMode="decimal"
              name="percentageHs"
              placeholder="Частка ХС"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              name="phone"
              placeholder="Кількість Смартфонів"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              name="pc"
              placeholder="Кількість Ноутбуків"
              className={css.input}
            />
            <Field
              type="number"
              inputMode="numeric"
              name="tv"
              placeholder="Кількість Телевізорів"
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
