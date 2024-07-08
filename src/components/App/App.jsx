import { useState, useEffect } from "react";
import PlanForm from "../Plan/PlanForm";
import css from "./App.module.css";
import { db, ref, set, get, child } from "../../firebase";
import UserForm from "../UserForm/UserForm";
import Header from "../Header/Header";
import Salary from "../Salary/Salary";

export default function App() {
  const [day, setDay] = useState(1);
  const [plan, setPlan] = useState([]);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [itSum, setItSum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, `plans`));
        if (snapshot.exists()) {
          const storedPlans = snapshot.val();
          setPlan(storedPlans);
          console.log("Data fetched from Firebase: ", storedPlans);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const saveData = async (updatedPlan) => {
    try {
      await set(ref(db, "plans"), updatedPlan);
      console.log("Data saved to Firebase: ", updatedPlan);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const updatePlan = (newPlan) => {
    const updatedPlans = [...plan];
    updatedPlans[newPlan.day - 1] = newPlan;
    setPlan(updatedPlans);
    saveData(updatedPlans);
  };

  const toggleComponent = () => {
    setShowPlanForm(true);
  };

  const resetComponent = () => {
    setShowPlanForm(false);
  };

  return (
    <div className={css.container}>
      <Header
        toggleComponent={toggleComponent}
        resetComponent={resetComponent}
      />
      {showPlanForm ? (
        <PlanForm newPlan={updatePlan} setDay={setDay} day={day} plan={plan} />
      ) : (
        <>
          <UserForm plan={plan} onSumItChange={setItSum} />
          <Salary itSum={itSum} />
        </>
      )}
    </div>
  );
}
