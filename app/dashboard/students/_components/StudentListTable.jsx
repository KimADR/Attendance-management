import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  ValidationModule,
  TextFilterModule,
  PaginationModule,
  QuickFilterModule,
} from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Search, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function StudentListTable({ studentList, refreshData }) {

  const CustomButtons = (props) => {
    return (
      <AlertDialog>
        {/* Use asChild to avoid wrapping the child with an extra <button> */}
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "contact", filter: true },
    { field: "address", filter: true },
    { field: "action", cellRenderer: CustomButtons },
  ]);

  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (studentList) {
      setRowData(studentList);
    }
  }, [studentList]);

  const DeleteRecord=(id)=>{
    GlobalApi.DeleteStudentRecord(id).then(resp=>{
        if(resp)
        {
            toast('Record deleted successfully');
            refreshData();
        }
    })
  }

  return (
    <div className='my-7'>
      <div style={{ height: 500 }} className="ag-theme-quartz">
        <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
          <Search />
          <input
            type="text"
            placeholder='Search on Anything...'
            className='outline-none w-full bg-transparent'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          modules={[
            ClientSideRowModelModule,
            ValidationModule,
            TextFilterModule,
            PaginationModule,
            QuickFilterModule,
          ]}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
