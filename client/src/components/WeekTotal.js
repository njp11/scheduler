import React, { useState, useEffect } from 'react';
import { getTotal } from './utils';

const WeekTotal = ({ schedule, employee, setMessage }) => {
  const [shiftTotal, setShiftTotal] = useState(0);
  useEffect(() => {
    const total = getTotal(employee, schedule);
    total > 7 &&
      setMessage(
        ' Selected employee has been assign more than 7 shifts per week'
      );
    setShiftTotal(total);
    // eslint-disable-next-line
  }, []);

  return <td className={shiftTotal > 7 ? 'warning-bg' : null}>{shiftTotal}</td>;
};

export default WeekTotal;
