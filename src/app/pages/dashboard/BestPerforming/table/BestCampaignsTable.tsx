import { ColumnInstance, Row, useTable } from "react-table"
import { KTCardBody } from "../../../../../_metronic/helpers"
import { BestCampaignsColumns } from "./columns/_columns"
import { useEffect, useMemo, useState } from "react"
import { CustomHeaderColumn } from "./columns/CustomHeader"
import { CustomRow } from "./columns/CustomRow"
import { useQueryResponse, useQueryResponseData, useQueryResponseLoading } from "../core/QueryResponseProvider"
import { BestCampaignsPagination } from "../components/pagination/BestCampaignsPagination"

function BestCampaignsTable({ rowsCount }) {
    const [pagePerCampaignCount, setPagePerCampaignCount] = useState(rowsCount)
    const users = useQueryResponseData()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => users, [users])
    const columns = useMemo(() => BestCampaignsColumns, [])
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data,

    })

    useEffect(() => {
        setPagePerCampaignCount(rows)
    }, [rowsCount])

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
            <BestCampaignsPagination />
        </KTCardBody>
    )
}

export default BestCampaignsTable
