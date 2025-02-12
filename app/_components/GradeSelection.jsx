"use client";

import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi';

function GradeSelection({selectedGrade}) {

    const [grades, setGrades]=useState([]);

    useEffect(() => {
            GetAllGradesList();
        }, []);
    
        const GetAllGradesList = () => {
            GlobalApi.GetAllGrades().then(res => {
                setGrades(res.data);
            });
        };
    return (
        <div>
            <select className='py-2 border rounded-lg bg-transparent'
              onChange={(e) => selectedGrade(e.target.value)}
              >
                {grades.map((item, index) => (
                    <option key={index} value={item.grade}>{item.grade}</option>
                ))}
            </select>
        </div>
    )
}

export default GradeSelection
