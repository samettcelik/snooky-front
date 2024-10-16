import {FC, useMemo} from 'react'
import {ID} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'

type Props = {
  id: ID
}

const DomainSelectionCell: FC<Props> = ({id}) => {
  const {selected, onSelect} = useListView()
  const isSelected = useMemo(() => selected.includes(id), [id, selected])
  return (
    <div className='form-check form-check-custom form-check-solid'>
      #
    </div>
  )
}

export {DomainSelectionCell}
