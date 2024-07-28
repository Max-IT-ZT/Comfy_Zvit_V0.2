import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import css from "./UserForm.module.css";
import Modal from "../Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import { GiRobber } from "react-icons/gi";
import { GiMouthWatering } from "react-icons/gi";

export default function UserForm({ plan, onSumItChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [today, setToday] = useState(new Date().getDate());

  useEffect(() => {
    const todayDate = new Date();
    setToday(todayDate.getDate());
  }, []);

  const calculatePercentage = (actual, plan) => {
    const percentage = ((actual / plan) * 100 - 100).toFixed(1);
    return percentage > 0 ? `+${percentage}` : percentage;
  };

  const handleSubmitForm = (values, actions) => {
    const { sumIt, sumHs, percentageIt, percentageHs, phone, tv, pc } = values;

    const todayPlan = plan.find((item) => item.day === today);

    if (todayPlan) {
      const percentageItValue = calculatePercentage(sumIt, todayPlan.it);
      const percentageHsValue = calculatePercentage(sumHs, todayPlan.hs);

      let modalMessage = `Житомир\n`;
      modalMessage += `ІТ ${todayPlan.it}/${sumIt} (${percentageItValue}%)`;
      if (percentageIt) {
        modalMessage += `\nЧастка: ${percentageIt}%`;
      }
      modalMessage += `\nХС ${todayPlan.hs}/${sumHs} (${percentageHsValue}%)`;
      if (percentageHs) {
        modalMessage += `\nЧастка: ${percentageHs}%`;
      }
      if (phone || phone === 0) {
        modalMessage += `\n📱 - ${phone}шт.`;
      }
      if (pc || pc === 0) {
        modalMessage += `\n💻 - ${pc}шт.`;
      }
      if (tv || tv === 0) {
        modalMessage += `\n📺 - ${tv}шт.`;
      }
      const sumItPlanCompleted = sumIt - todayPlan.it;
      const sumHsPlanCompleted = sumHs - todayPlan.hs;

      if (sumHs > 0) {
        {
          sumHsPlanCompleted < 0
            ? toast(`До виконання плану ХС ще ${-sumHsPlanCompleted}грн.`, {
                duration: 6000,
                icon: <GiRobber color="gold" />,
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              })
            : toast.success(
                `План ХС перевиконаний на ${sumHsPlanCompleted}грн.`,
                {
                  duration: 6000,
                  icon: <GiMouthWatering color="red" />,
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                }
              );
        }
      }
      if (sumIt > 0) {
        {
          sumItPlanCompleted < 0
            ? toast(`До виконання плану ІТ ще ${-sumItPlanCompleted}грн.`, {
                duration: 6000,
                icon: <GiRobber color="gold" />,
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              })
            : toast.success(
                `План ІТ перевиконаний на ${sumItPlanCompleted}грн.`,
                {
                  duration: 6000,
                  icon: <GiMouthWatering color="red" />,
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                }
              );
        }
      }

      setModalContent(modalMessage);
      setModalOpen(true);
    }

    actions.resetForm();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCopySuccess = () => {
    toast.success("Повідомлення скопійовано!");
  };

  const handleSumItChange = (e, handleChange) => {
    e.target.value = e.target.value.replace(".", ",");
    handleChange(e);
    if (onSumItChange) {
      onSumItChange(e.target.value);
    }
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
        {({ handleChange, values }) => (
          <Form className={css.form}>
            <div className={css.inputWrapper}>
              <Field
                type="number"
                inputMode="numeric"
                name="sumIt"
                id="sumIt"
                className={css.input}
                onChange={(e) => handleSumItChange(e, handleChange)}
                value={values.sumIt}
              />
              <label
                htmlFor="sumIt"
                className={`${css.label} ${values.sumIt !== "" && css.filled}`}
              >
                Сума ІТ
              </label>
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="number"
                inputMode="decimal"
                name="percentageIt"
                id="percentageIt"
                className={css.input}
                value={values.percentageIt}
                onChange={handleChange}
              />
              <label
                htmlFor="percentageIt"
                className={`${css.label} ${
                  values.percentageIt !== "" && css.filled
                }`}
              >
                Частка ІТ
              </label>
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="number"
                inputMode="numeric"
                name="sumHs"
                id="sumHs"
                className={css.input}
                value={values.sumHs}
                onChange={handleChange}
              />
              <label
                htmlFor="sumHs"
                className={`${css.label} ${values.sumHs !== "" && css.filled}`}
              >
                Сума ХС
              </label>
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="number"
                inputMode="decimal"
                name="percentageHs"
                id="percentageHs"
                className={css.input}
                value={values.percentageHs}
                onChange={handleChange}
              />
              <label
                htmlFor="percentageHs"
                className={`${css.label} ${
                  values.percentageHs !== "" && css.filled
                }`}
              >
                Частка ХС
              </label>
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="number"
                inputMode="numeric"
                name="phone"
                id="phone"
                className={css.input}
                value={values.phone}
                onChange={handleChange}
              />
              <label
                htmlFor="phone"
                className={`${css.label} ${values.phone !== "" && css.filled}`}
              >
                Кількість Смартфонів
              </label>
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="number"
                inputMode="numeric"
                name="pc"
                id="pc"
                className={css.input}
                value={values.pc}
                onChange={handleChange}
              />
              <label
                htmlFor="pc"
                className={`${css.label} ${values.pc !== "" && css.filled}`}
              >
                Кількість Ноутбуків
              </label>
            </div>

            <div className={css.inputWrapper}>
              <Field
                type="number"
                inputMode="numeric"
                name="tv"
                id="tv"
                className={css.input}
                value={values.tv}
                onChange={handleChange}
              />
              <label
                htmlFor="tv"
                className={`${css.label} ${values.tv !== "" && css.filled}`}
              >
                Кількість Телевізорів
              </label>
            </div>

            <button className={css.formBtn} type="submit">
              Відправити
            </button>
          </Form>
        )}
      </Formik>

      <Modal
        isOpen={modalOpen}
        closeModal={closeModal}
        onCopy={handleCopySuccess}
      >
        {modalContent}
      </Modal>
      <Toaster reverseOrder={false} />
    </>
  );
}
