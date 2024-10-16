// @ts-nocheck
import clsx from 'clsx'
import { FC } from 'react'
import { Row } from 'react-table'
import { Invoice } from '../../core/_models'

type Props = {
  row: Row<Invoice>,
  index?: number
}

const CustomRow: FC<Props> = ({ row, index }) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      const id = cell.column.id
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({ 'min-w-100px': cell.column.id === 'actions' })}
        >
          {id === 'joined_day' ? <span>{cell?.value?.split(',')[0]}</span> : id === 'selection' ? <span className='ms-1'>{index + 1}</span> : cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export { CustomRow }
