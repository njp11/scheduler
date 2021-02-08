import React, { useEffect, useState } from 'react';
import { countEmployeeShift } from './utils';
const DayTotalShift = ({ day, schedule, employee, setMessage }) => {
  const [shiftCount, setShiftCount] = useState(0);
  useEffect(() => {
    const count = countEmployeeShift(day, employee, schedule);
    count > 2 && setMessage('Selected employee has more than 2 shifts per day');
    setShiftCount(count);
    // eslint-disable-next-line
  }, []);

  return <td className={shiftCount > 2 ? 'warning-bg' : null}>{shiftCount}</td>;
};

export default DayTotalShift;
