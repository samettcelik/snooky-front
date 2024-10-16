import { ColumnInstance, Row, useTable } from "react-table"
import { KTCardBody } from "../../../../../_metronic/helpers"
import { logColumns } from "./columns/_columns"
import { useMemo } from "react"
import { CustomHeaderColumn } from "./columns/CustomHeader"
import { CustomRow } from "./columns/CustomRow"
import { useQueryResponseData, useQueryResponseLoading } from "../core/QueryResponseProvider"
import { LogPagination } from "../components/pagination/LogPagination"

const coupons = [
    {
        status: true,
        name: 'Test coupon 1',
        couponUsage: 30,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 2',
        couponUsage: 10,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 3',
        couponUsage: 25,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: false,
    },
    {
        status: false,
        name: 'Test coupon 4',
        couponUsage: 90,
        createdAt: new Date(),
        expiresDate: new Date('10-10-2022'),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 5',
        couponUsage: 25,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: false,
    },
    {
        status: false,
        name: 'Test coupon 6',
        couponUsage: 100,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 1',
        couponUsage: 30,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 2',
        couponUsage: 10,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 3',
        couponUsage: 25,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: false,
    },
    {
        status: false,
        name: 'Test coupon 4',
        couponUsage: 90,
        createdAt: new Date(),
        expiresDate: new Date('10-10-2022'),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 5',
        couponUsage: 25,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: false,
    },
    {
        status: false,
        name: 'Test coupon 6',
        couponUsage: 100,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 1',
        couponUsage: 30,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 2',
        couponUsage: 10,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 3',
        couponUsage: 25,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: false,
    },
    {
        status: false,
        name: 'Test coupon 4',
        couponUsage: 90,
        createdAt: new Date(),
        expiresDate: new Date('10-10-2022'),
        actions: true,
    },
    {
        status: true,
        name: 'Test coupon 5',
        couponUsage: 25,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: false,
    },
    {
        status: false,
        name: 'Test coupon 6',
        couponUsage: 100,
        createdAt: new Date(),
        expiresDate: new Date(),
        actions: true,
    },
]

function LogTable() {
    const users = useQueryResponseData()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => users, [users])
    const columns = useMemo(() => logColumns, [])
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data,
    })
    return (
        <KTCardBody>
            <div className="table-responsive" style={{marginTop: -10}}>
                <table
                    id="kt_table_coupons"
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                        <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            {headers.map((column: ColumnInstance<any>) => (
                                <CustomHeaderColumn key={column.id} column={column} />
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                        {rows.length > 0 ? (
                            rows.map((row: Row<any>, i) => {
                                prepareRow(row)
                                return <CustomRow row={row} index={i} key={`row-${i}-${row.id}`} />
                            })
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                        No matching records found
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <LogPagination />
        </KTCardBody>
    )
}

export default LogTable
