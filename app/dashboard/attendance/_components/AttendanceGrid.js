"use client"

import { useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react"
import { ClientSideRowModelModule } from "ag-grid-community"

function AttendanceGrid({ attendanceList }) {
  const [rowData, setRowData] = useState()
  const [colDefs, setColDefs] = useState([{ field: "studentId" }, { field: "name" }])

  useEffect(() => {
    const userList = getUniqueRecord()
    console.log(userList)
    setRowData(userList)
  }, [attendanceList]) //This hook specifies more dependencies than necessary: attendanceList

  /**
   * Used to get Distinct User List
   * @returns
   */
  const getUniqueRecord = () => {
    const uniqueRecord = []
    const existingUser = new Set()

    attendanceList?.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId)
        uniqueRecord.push(record)
      }
    })

    return uniqueRecord
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        modules={[ClientSideRowModelModule]}
        rowData={rowData}
        columnDefs={colDefs}
        suppressCellFocus={true}
      />
    </div>
  )
}

export default AttendanceGrid

