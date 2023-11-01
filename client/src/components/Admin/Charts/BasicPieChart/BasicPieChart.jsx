import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect } from 'react';
import { useState } from 'react';

export default function BasicPieChart({bookings}) {
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [cancelled, setCancelled] = useState(0);
    
    useEffect(() => {
        console.log(bookings)
      const pending = bookings.filter((item) => item.paymentStatus == 'Paid');
      const cancelled = bookings.filter((item) => item.paymentStatus == 'Cancelled');
      const completed = bookings.filter((item) => item.paymentStatus =='Completed');
      const pendingPercentage = (pending.length / bookings.length) * 100
      const cancelPercentage = (cancelled.length / bookings.length) * 100
      const completedPercentage = (completed.length / bookings.length) * 100
      setPending(pendingPercentage);
      setCancelled(cancelPercentage);
      setCompleted(completedPercentage);
    }, [bookings]);
    
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value:completed, label: `completed ${Math.floor(completed)}` },
            { id: 1, value:pending, label: `pending ${Math.floor(pending)}` },
            { id: 2, value:cancelled, label: `cancelled ${Math.floor(cancelled)}` },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
