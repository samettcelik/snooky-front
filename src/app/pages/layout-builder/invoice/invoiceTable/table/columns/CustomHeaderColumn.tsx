// @ts-nocheck
import { FC } from 'react'
import { ColumnInstance } from 'react-table'
import { Invoice } from '../../core/_models'

type Props = {
  column: ColumnInstance<Invoice>
}

const CustomHeaderColumn: FC<Props> = ({ column }) => {
  if (column.id === 'selection') {
    return <>
      {column.Header && typeof column.Header === 'string' ? (
        <th {...column.getHeaderProps()}>STATUS</th>
      ) : (
        <th {...column.getHeaderProps()} >
          <tr className='d-flex align-items-center border-bottom-0'>
            <div className='mt-1'>#</div>
          </tr>
        </th>
      )}
    </>
  }
  return <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
}

export { CustomHeaderColumn }
