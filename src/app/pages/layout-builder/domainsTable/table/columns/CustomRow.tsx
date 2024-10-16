// @ts-nocheck
import clsx from 'clsx'
import { FC } from 'react'
import { Row } from 'react-table'
import { Domain } from '../../core/_models'

type Props = {
  row: Row<Domain>,
  index: number
}

const CustomRow: FC<Props> = ({ row, index }) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      const id = cell.column.id
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({ 'min-w-100px': cell?.column?.id === 'actions' })}
        >
          {id === 'last_login' ? <div className={`badge badge-secondary fw-bolder`}>Incomplete</div> :
            id === 'selection' ? <span className='ms-1'>{index + 1}</span> : cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export { CustomRow }
