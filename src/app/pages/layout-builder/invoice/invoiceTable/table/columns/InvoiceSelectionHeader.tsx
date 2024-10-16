import {FC, PropsWithChildren} from 'react'
import {HeaderProps} from 'react-table'
import {useListView} from '../../core/ListViewProvider'
import {Invoice} from '../../core/_models'

type Props = {
  tableProps: PropsWithChildren<HeaderProps<Invoice>>
}

const InvoiceSelectionHeader: FC<Props> = ({tableProps}) => {
  const {isAllSelected, onSelectAll} = useListView()
  return (
    <th {...tableProps.column.getHeaderProps()} className='w-10px pe-2'>
      <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
        #
      </div>
    </th>
  )
}

export {InvoiceSelectionHeader}
