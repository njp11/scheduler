import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import EmployeeSelect from "./components/EmployeeSelect";
import DayTotalShift from "./components/DayTotalShift";
import WeekTotal from "./components/WeekTotal";
import {
  checkLunchValidity,
  checkMorningValidity,
  checkAfternoonValidity,
  countEmployeeShift,
  getTotal,
  reqEmployees,
} from "./components/utils";

function App() {
  const [schedule, setSchedule] = useState({
    "Morning Up Stairs": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Morning Down Stairs": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Morning Parking Lot": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Lunch A": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Lunch B": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Lunch C": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Lunch D": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Afternoon Up Stairs": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Afternoon Down Stairs": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
    "Afternoon Parking Lot": {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    },
  });
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const employees = ["X1", "X2", "X3", "X4", "X5", "X6", "X7"];
  const [warning1, setWarning1] = useState("");
  const [warning2, setWarning2] = useState("");
  const [warning3, setWarning3] = useState("");
  const [warning4, setWarning4] = useState("");
  const [success, setSuccess] = useState("");
  const [fail, setFail] = useState("");
  // clearing messages on the screen
  const clearMsg = () => {
    setWarning1("");
    setWarning2("");
    setWarning3("");
    setWarning4("");
    setSuccess("");
    setFail("");
  };
  // requesting saved schedule
  const fetchSavedSchedule = async () => {
    const res = await fetch("/schedule");
    if (res.status === 200) {
      const data = await res.json();
      delete data["_id"];
      delete data["__v"];
      setSchedule({ ...data });
    } else {
      console.log("No data found on server");
    }
  };
  useEffect(() => {
    clearMsg();
    fetchSavedSchedule();
    //eslint-disable-next-line
  }, []);

  // handling autofill
  const handleAutofill = () => {
    clearMsg();
    let newSchedule = { ...schedule };
    const shifts = Object.keys(newSchedule);

    shifts.forEach((shift) => {
      const weekdays = Object.keys(newSchedule[shift]);
      weekdays.forEach((day) => {
        if (!newSchedule[shift][day]) {
          let err1;
          let err2;
          let err3;
          employees
            .sort(() => Math.random() - 0.5)
            .forEach((employee) => {
              if (shift.includes("Morning")) {
                err1 = checkMorningValidity(newSchedule, day, shift, employee);
              }
              if (shift.includes("Afternoon")) {
                err2 = checkAfternoonValidity(
                  newSchedule,
                  day,
                  shift,
                  employee
                );
              }
              if (shift.includes("Lunch")) {
                err3 = checkLunchValidity(newSchedule, day, shift, employee);
              }

              let err4 = countEmployeeShift(day, employee, newSchedule);
              let err5 = getTotal(employee, newSchedule);
              if (!err1 && !err2 && !err3 && err4 < 2 && err5 < 7) {
                newSchedule[shift][day] = employee;
              }
            });
        }
      });
    });
    shifts.forEach((shift) => {
      const weekdays = Object.keys(newSchedule[shift]);
      weekdays.forEach((day) => {
        if (!newSchedule[shift][day]) {
          const minEmployees = reqEmployees(schedule, employees);
          setWarning1(
            `There are not enough employees to fill all the shifts. At least ${minEmployees} total employees needed to fill all the shifts.`
          );
        }
      });
    });
    setSchedule({ ...newSchedule });
  };

  // handling employee option selection
  const handleOptionSelect = (e, day, shift) => {
    clearMsg();
    const { value } = e.target;
    if (shift.includes("Lunch")) {
      const errorMsg = checkLunchValidity(schedule, day, shift, value);
      setWarning3(errorMsg);
      if (errorMsg) return;
    }
    if (shift.includes("Morning") || shift.includes("Afternoon")) {
      const morningErr = checkMorningValidity(schedule, day, shift, value);
      const afternoongErr = checkAfternoonValidity(schedule, day, shift, value);
      morningErr && setWarning4(morningErr);
      afternoongErr && setWarning4(afternoongErr);
      if (morningErr || afternoongErr) {
        return;
      }
    }
    setSchedule({
      ...schedule,
      [shift]: {
        ...schedule[shift],
        [day]: value,
      },
    });
  };
  // submitting progress to database
  const handleSubmit = async (e) => {
    setSuccess("");
    setFail("");
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    try {
      const res = await axios.post("/", schedule, config);
      const msg = await res.data.msg;
      e.target.innerHTML === "Save"
        ? setSuccess(msg)
        : setSuccess("Schedule progress successfully cleared");
      fetchSavedSchedule();
    } catch (error) {
      console.log(error);
      setFail("Sorry! something went wrong, schedule not saved.");
    }
  };

  // handling clear all shift
  const handleClear = (e) => {
    clearMsg();
    const clearSchedule = schedule;
    const shifts = Object.keys(schedule);
    const clearData = {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
    };
    shifts.forEach((shift) => {
      clearSchedule[shift] = clearData;
    });
    setSchedule({ ...clearSchedule });
    handleSubmit(e);
  };

  return (
    <div className="app">
      {warning1 && (
        <h3 className="warning">
          <span>
            <i className="fas fa-exclamation-triangle"></i>
          </span>{" "}
          {warning1}
        </h3>
      )}
      {warning2 && (
        <h3 className="warning">
          <span>
            <i className="fas fa-exclamation-triangle"></i>
          </span>{" "}
          {warning2}
        </h3>
      )}
      {warning3 && (
        <h3 className="warning">
          <span>
            <i className="fas fa-exclamation-triangle"></i>
          </span>{" "}
          {warning3}
        </h3>
      )}
      {warning4 && (
        <h3 className="warning">
          <span>
            <i className="fas fa-exclamation-triangle"></i>
          </span>{" "}
          {warning4}
        </h3>
      )}
      <table border="1">
        <thead className="text-left t-btn">
          <tr>
            <th colSpan="6">
              <button className="btn" onClick={handleAutofill}>
                Autofill Shifts
              </button>
              <button className="clear-btn" onClick={handleClear}>
                Clear All
              </button>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th colSpan="6">Schedule</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th></th>
            {days.map((item, index) => (
              <th className="text-left" key={uuidv4()}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(schedule).map((shift, index) => (
            <tr key={index}>
              <th className="text-left">{shift}</th>
              {Object.keys(schedule[shift]).map((day) => (
                <EmployeeSelect
                  key={uuidv4()}
                  day={day}
                  shift={shift}
                  value={schedule[shift][day]}
                  handleOptionSelect={handleOptionSelect}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {fail && <h4 className="fail-msg">{fail}</h4>}
      {success && <h4 className="success-msg">{success}</h4>}
      <div>
        <button className="btn save-btn" onClick={handleSubmit}>
          Save
        </button>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th colSpan="7">Load</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Staff Member</th>
            {days.map((item) => (
              <th className="text-left" key={uuidv4()}>
                {item}
              </th>
            ))}
            <th>Totals</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={uuidv4()}>
              <th className="text-left">{emp}</th>
              {days.map((day) => (
                <DayTotalShift
                  key={uuidv4()}
                  schedule={schedule}
                  day={day}
                  employee={emp}
                  setMessage={(msg) => setWarning1(msg)}
                />
              ))}
              <WeekTotal
                schedule={schedule}
                setMessage={(msg) => setWarning2(msg)}
                employee={emp}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
