import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, ValidationModule, TextFilterModule, PaginationModule,QuickFilterModule} from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Search, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function StudentListTable({ studentList }) {

    const CustomButtons=(props)=>{
        return <Button variant="destructive"><Trash/></Button>
    }

    const [colDefs, setColDefs] = useState([
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "contact", filter: true },
        { field: "address", filter: true },
        { field: "action", cellRenderer:CustomButtons },
    ]);

    const [rowData, setRowData] = useState();

    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        studentList && setRowData(studentList);
    }, [studentList])
    return (
        <div className='my-7'>
            <div
                // define a height because the Data Grid will fill the size of the parent container
                style={{ height: 500 }}
            >
                <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    <Search />
                    <input type="text" placeholder='Search on Anything...'
                    className='outline-none w-full bg-transparent'
                    onChange={(event)=>setSearchInput(event.target.value)}
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    quickFilterText={searchInput}
                    modules={[ClientSideRowModelModule, ValidationModule, TextFilterModule,PaginationModule, QuickFilterModule,]} 
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    )
}

export default StudentListTable
