"use client"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { Reservation } from '@prisma/client';
import { eachDayOfInterval } from 'date-fns';

export function SelectCalender({reservation}:{reservation:Reservation[]}) {

 const [dates,setDates]=useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }])

  let disabledDate:any=[]
  
  reservation.forEach(item=>{
    const datRange = eachDayOfInterval({start:new Date(item.startDate),end:new Date(item.endDate)})
    disabledDate = [...disabledDate,...datRange]
  })


   

    return (
      <>
      <input type="text" className='hidden' name='startDate' value={dates[0].startDate.toISOString()} />
      <input type="text" className='hidden' name='endDate' value={dates[0].endDate.toISOString()} />
      <DateRange
        ranges={dates}
        onChange={(item)=>setDates([item.selection ] as any)}
        rangeColors={["#FF5A5F"]}
        showDateDisplay={false}
        minDate={new Date()}
        direction='vertical'
        disabledDates={disabledDate}
      />
      </>
    )
  }
