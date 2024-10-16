import clsx from "clsx"
import { Coupon } from "../../core/_models"
import { Row } from "react-table"
import { FC } from "react"


type Props = {
    row: Row<Coupon>,
    index: number
}

const CustomRow: FC<Props> = ({ row, index }) => (
    <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
            const id = cell.column.id
            return (
                <td
                    {...cell.getCellProps()}
                    className={'min-w-80px'}
                >
                    {cell.render('Cell')}
                </td>
            )
        })}
    </tr>
)

export { CustomRow }