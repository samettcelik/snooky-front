import { ColumnInstance, Row, useTable } from "react-table"
import { KTCardBody } from "../../../../../_metronic/helpers"
import { couponColumns } from "./columns/_columns"
import { useEffect, useMemo } from "react"
import { Coupon } from "../core/_models"
import { CustomHeaderColumn } from "./columns/CustomHeader"
import { CustomRow } from "./columns/CustomRow"
import { useQueryResponse, useQueryResponseData, useQueryResponseLoading } from "../core/QueryResponseProvider"
import { CouponPagination } from "../components/pagination/CouponPagination"
import { useQueryRequest } from "../core/QueryRequestProvider"

function CouponTable() {
    const coupons = useQueryResponseData()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => coupons, [coupons])
    const columns = useMemo(() => couponColumns, [])
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data,
    })

    const { refetch } = useQueryResponse()

    useEffect(() => {
        if (coupons) {
            refetch()
        }
    }, [coupons])

    return (
        <KTCardBody>
            <div className="table-responsive">
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
            <CouponPagination />
        </KTCardBody>
    )
}

export default CouponTable
