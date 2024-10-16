import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { PopupsListHeader } from './components/header/PopupsListHeader'
import { PopupsTable } from './table/PopupsTable'
import { PopupEditModal } from './popup-edit-modal/PopupEditModal'
import { KTCard } from '../../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { campaignsArchiveAtom } from '../../../../store/jotai/CampaignTableAtoms'

const PopupsList = () => {
  const [showArchives, setShowArchives] = useAtom(campaignsArchiveAtom)
  const { itemIdForUpdate, selected } = useListView()
  const [files, setFiles] = useState<Array<{ name: string, value: boolean }>>([])

  useEffect(() => {
    if (files.length > 0) {
      setShowArchives({ show: files[1].value })
    }
  }, [files])

  return (
    <>
      <KTCard>
        <PopupsListHeader files={files} setFiles={setFiles} />
        <PopupsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <PopupEditModal />}
    </>
  )
}

const PopupsListWrapper = () => {
  const { selected } = useListView()

  return (
    <div className='position-relative'>
      <QueryRequestProvider>
        <QueryResponseProvider>
          <ListViewProvider>
            <PopupsList />
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </div>
  )
}

export { PopupsListWrapper }
