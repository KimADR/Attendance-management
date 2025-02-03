"use client";

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

function AddNewStudent() {
    const [open, setOpen] = useState(false);
    const [grades, setGrades]=useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        GetAllGradesList();
    }, []);

    const GetAllGradesList = () => {
        GlobalApi.GetAllGrades().then(res => {
            setGrades(res.data);
        });
    };

    const onSubmit = (data) => {
        console.log("FormData", data);
        GlobalApi.CreateNewStudent(data).then(res=>{
            console.log("--",res);
            if(res.data)
            {
                setOpen(false);
                toast('New Student Added with success!')
            }
        });
    };

    return (
        <div className=''>
            <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
            <Dialog open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            {/* Move the form outside of the <p> element to prevent the hydratation error*/}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='py-2'>
                            <label>Full Name</label>
                            <Input
                                placeholder='Ex. Kim Andria'
                                {...register('name', { required: true })}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Select Grade</label>
                            <select className='py-3 border rounded-lg bg-transparent'
                                {...register('grade', { required: true })}>
                                    {grades.map((item,index)=>(
                                        <option key={index} value={item.grade}>{item.grade}</option>
                                    ))}
                            </select>
                        </div>
                        <div className='py-2'>
                            <label>Contact</label>
                            <Input
                                placeholder='Ex. +261 35 786 23'
                                {...register('contact')} />
                        </div>
                        <div className='py-2'>
                            <label>Address</label>
                            <Input
                                placeholder='Ex. FIII 34/290 Fianarantsoa'
                                {...register('address')} />
                        </div>
                        <div className='flex gap-3 items-center justify-end mt-5'>
                            <Button onClick={() => setOpen(false)} variant='ghost'>Cancel</Button>
                            <Button
                                type="submit"
                            >Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewStudent;