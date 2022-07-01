import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const Calendar = () => {

    const [selected, setSelected] = useState(new Date());

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }

    return (
       <div className='mt-10 min-h-screen'>
        <h1 className='text-center font-bold text-3xl mb-10'>Select Your Date</h1>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 shadow bg-slate-100'>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        footer={footer}
                    />
                </div>
            </div>
       </div>
    );
};

export default Calendar;