// counting total shifts employee did in a day.
export const countEmployeeShift = (day, employee, schedule) => {
  const shifts = Object.keys(schedule);
  let count = 0;
  shifts.forEach((shift) => {
    if (schedule[shift][day] === employee) {
      count++;
    }
  });
  return count;
};

// counting total shifts for employee in a week
export const getTotal = (employee, schedule) => {
  const shifts = Object.keys(schedule);
  let total = 0;
  shifts.forEach((shift) => {
    let count = 0;
    for (let item in schedule[shift]) {
      if (schedule[shift][item] === employee) {
        count++;
      }
    }
    total += count;
  });
  return total;
};

// consecutive lunch slot validation
export const checkLunchValidity = (schedule, day, shift, value) => {
  if (shift === "Lunch A" && schedule["Lunch B"][day] === value) {
    return "Employee can't have consecutive lunch slots on the same day!";
  } else if (
    (shift === "Lunch B" && schedule["Lunch A"][day] === value) ||
    schedule["Lunch C"][day] === value
  ) {
    return "Employee can't have consecutive lunch slots on the same day!";
  } else if (
    (shift === "Lunch C" && schedule["Lunch B"][day] === value) ||
    schedule["Lunch D"][day] === value
  ) {
    return "Employee can't have consecutive lunch slots on the same day!";
  } else {
    return "";
  }
};

// Morning shift validation
export const checkMorningValidity = (schedule, day, shift, value) => {
  if (
    shift === "Morning Up Stairs" &&
    (schedule["Morning Down Stairs"][day] === value ||
      schedule["Morning Parking Lot"][day] === value)
  ) {
    return "Employee can not be present at two places at the same time";
  } else if (
    shift === "Morning Down Stairs" &&
    (schedule["Morning Up Stairs"][day] === value ||
      schedule["Morning Parking Lot"][day] === value)
  ) {
    return "Employee can not be present at two places at the same time";
  } else if (
    shift === "Morning Parking Lot" &&
    (schedule["Morning Up Stairs"][day] === value ||
      schedule["Morning Down Stairs"][day] === value)
  ) {
    return "Employee can not be present at two places at the same time";
  } else {
    return "";
  }
};

// Afternoon Shift validation
export const checkAfternoonValidity = (schedule, day, shift, value) => {
  if (
    shift === "Afternoon Up Stairs" &&
    (schedule["Afternoon Down Stairs"][day] === value ||
      schedule["Afternoon Parking Lot"][day] === value)
  ) {
    return "Employee can not be present at two places at the same time";
  } else if (
    shift === "Afternoon Down Stairs" &&
    (schedule["Afternoon Up Stairs"][day] === value ||
      schedule["Afternoon Parking Lot"][day] === value)
  ) {
    return "Employee can not be present at two places at the same time";
  } else if (
    shift === "Afternoon Parking Lot" &&
    (schedule["Afternoon Up Stairs"][day] === value ||
      schedule["Afternoon Down Stairs"][day] === value)
  ) {
    return "Employee can not be present at two places at the same time";
  } else {
    return "";
  }
};

// counting min employees needed to fill all the shifts

export const reqEmployees = (schedule, employees) => {
  let totalEmployees = employees.length;
  let totalShifts;
  let maxShiftsPossible;
  do {
    totalEmployees++;
    totalShifts = Object.keys(schedule).length * 5;
    maxShiftsPossible = totalEmployees * 7;
  } while (totalShifts > maxShiftsPossible);
  return totalEmployees;
};
