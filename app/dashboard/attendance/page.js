"use client"

import GradeSelection from '@/app/_components/GradeSelection'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

function Attendance() {

    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedGrade, setSelectedGrade] = useState();
    const [attendanceList, setAttendanceList]=useState();

    // Used to fetch attendance list for given month and Grade

    const onSearchHandler = () => {
        const month=moment(selectedMonth).format('YYYY-MM');        
        GlobalApi.GetAttendanceList(selectedGrade,month).then(res=>{
            setAttendanceList(res.data);
        })
    }

    return (
        <div className="p-10">
            <h2 className='text-2xl font-bold'>Attendance</h2>
            {/* Search option */}

            <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
                <div className='flex gap-2 items-center'>
                    <label className=''>Select Month:</label>
                    <MonthSelection  selectedMonth={(value)=>setSelectedMonth(value)}/>
                </div>
                <div className='flex gap-2 items-center'>
                    <label className=''>Select Grade:</label>
                    <GradeSelection selectedGrade={(v)=>setSelectedGrade(v)}/>
                </div>
                <Button 
                onClick={() =>onSearchHandler()}
                >Search</Button>
            </div>

            {/* Student Attendance Grid */}
            <AttendanceGrid attendanceList={attendanceList}/>
        </div>
    )
}

export default Attendance
