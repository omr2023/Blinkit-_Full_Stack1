/* eslint-disable no-unused-vars */
import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,

} from '@tanstack/react-table'
const DisplayTable = ({ data , column }) => {
    const table = useReactTable({
    data,
    columns : column,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="p-3">
      <table className='w-full text-sm  border-collapse border border-gray-300'>
        <thead className='bg-black text-white'>
                {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-b border border-gray-300'>
              {
                <th>Sr.No</th>
              }
              {headerGroup.headers.map(header => (
                <th key={header.id} className=' border whitespace-nowrap'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
                   {table.getRowModel().rows.map((row , index) => (
            <tr key={row.id}>
              <td className='flex items-center justify-center border px-2 p-1'>{index+1}</td>

              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border px-2 py-1 text-center whitespace-nowrap'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
      <div className="h-4" />

    </div>
  )
}

export default DisplayTable


