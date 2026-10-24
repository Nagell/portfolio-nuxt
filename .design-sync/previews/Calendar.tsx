import * as React from 'react';
import { Calendar } from 'design-system-mirror';

export const SingleDate = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 14));
  return (
    <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 9, 1)} className="w-fit rounded-md border" />
  );
};
