import { useState, useEffect } from "react";
import PlanForm from "../Plan/PlanForm";
import css from "./App.module.css";
import { db, ref, set, get, child } from "../../firebase";
import UserForm from "../UserForm/UserForm";
import Header from "../Header/Header";
import Salary from "../Salary/Salary";
import { Helmet } from "react-helmet";
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
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Comfy_Zvit" />
        <link rel="apple-touch-icon" href="/path/to/your/app-icon.png" />
      </Helmet>
      <div className={css.container}>
        <Header
          toggleComponent={toggleComponent}
          resetComponent={resetComponent}
        />
        {showPlanForm ? (
          <PlanForm
            newPlan={updatePlan}
            setDay={setDay}
            day={day}
            plan={plan}
          />
        ) : (
          <>
            <Salary itSum={itSum} />
            <UserForm plan={plan} onSumItChange={setItSum} />
          </>
        )}
      </div>
    </>
  );
}
