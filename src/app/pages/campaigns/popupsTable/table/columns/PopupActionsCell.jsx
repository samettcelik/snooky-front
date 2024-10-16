/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { ID, KTIcon, QUERIES } from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deletePopup } from '../../core/_requests'
import { Link } from 'react-router-dom'
import { CustomModal } from '../../../../../modules/customComponents/CustomModal'
import { toast } from 'react-toastify'
import { IoIosArrowDown } from 'react-icons/io'
import Select from "react-select";
import { useAtom } from 'jotai'
import { domainAtom } from '../../../../../../store/jotai/DomainAtom'
import { campaignsArchiveAtom } from '../../../../../../store/jotai/CampaignTableAtoms'

type Props = {
  id: ID,
  campaignName: string
}

const PopupActionsCell: FC<Props> = ({ id, campaignName }) => {
  const [domainsStore, setDomainsStore] = useAtom(domainAtom)
  const { selected, clearSelected } = useListView()
  const [showRestore, setShowRestore] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const { setItemIdForUpdate } = useListView()
  const { query } = useQueryResponse()
  const queryClient = useQueryClient()
  
  const[showArcvies, setShowArchives] = useAtom(campaignsArchiveAtom)
  const _showArchive = showArcvies.show

  const [showRename, setShowRename] = useState(false)
  const [showMoveTo, setShowMoveTo] = useState(false)
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [showFolders, setShowFolders] = useState(false)
  const [newName, setNewName] = useState(campaignName)
  const [newFolderName, setNewFolderName] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('')
  const [error, setError] = useState('')
  const [showArchive, setShowArchive] = useState(false)
  const [showDuplucate, setShowDuplucate] = useState(false)

  const [domainList, setDomainList] = useState([])
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showDomains, setShowDomains] = useState(false);

  const [showABs, setShowABs] = useState(false);
  const [selectedAB, setSelectedAB] = useState(null);
  const [ABs, setABs] = useState([
    { name: 'Test A/B', value: false }
  ]);

  const [files, setFiles] = useState([
    { name: 'All Folder', value: true },
    { name: 'Archive', value: false },
    { name: 'Yiğit', value: false },
    { name: 'Burak', value: false }
  ])

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deletePopup(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  const addFolder = () => {
    let _newArr = files
    _newArr.push({ name: newFolderName, value: false })
    setFiles([..._newArr])
    toast.success('New folder added')
    setShowMoveTo(false)
    setNewFolderName('')
  }

  useEffect(() => {
    if (domainsStore.domains.length > 0) {
      let _domains = []
      domainsStore.domains.map(dm => {
        let label = dm.name.includes('https://') ? dm.name.slice(8, dm.name.length) : dm.name.slice(7, dm.name.length)
        _domains.push({ label, value: dm.id })
      })
      setDomainList(_domains)
      setSelectedDomain({ value: _domains[0].value, label: _domains[0].label })
    }
  }, [domainsStore.domains])

  return (
    <div className='d-flex align-items-center gap-2 w-100 justify-content-center'>
      {showMoveTo && (
        <CustomModal
          title='Move to'
          Content={() => (
            <div className='d-flex flex-column gap-2'>
              <span>Move <span className='fw-bold'>{campaignName}</span> campaigns to folder : </span>
              <div style={{ width: 230 }} onClick={() => setShowFolders(!showFolders)} className='position-relative bg-white border px-6 py-2 d-flex align-items-center justify-content-between cursor-pointer'>
                <span className='fs-6'>{showNewFolder ? 'Add Folder' : selectedFolder ? selectedFolder : files[0].name}</span>
                <IoIosArrowDown />
              </div>
              {showFolders && (
                <div className='d-flex flex-column bg-white pt-2 shadow' style={{ width: 230 }}>
                  {files.map((file, index) => {
                    if (index === 1) return null
                    return <div onClick={() => {
                      setSelectedFolder(file.name)
                      setShowFolders(false)
                      setShowNewFolder(false)
                    }} className='w-100 px-6 py-3 cursor-pointer'>{file.name}</div>
                  })}
                  <div style={{ height: 0.5, width: '100%' }} className='bg-secondary my-1' />
                  <div onClick={() => {
                    setShowFolders(false)
                    setShowNewFolder(true)
                  }} className='w-100 px-6 py-3 cursor-pointer'>Add Folder</div>
                </div>
              )}
              {showNewFolder && (
                <>
                  <input
                    type='text'
                    data-kt-user-table-filter='search'
                    style={{ width: 230 }}
                    className='form-control form-control-solid px-6'
                    placeholder='New Folder Name'
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                  {error && <span className='text-danger fs-6'>{error}</span>}
                </>
              )}
            </div>
          )}
          cancelBtnTitle='Discard'
          submitBtnTitle='Move'
          setShowModal={setShowMoveTo}
          submitBtnClassName='btn-primary'
          onPressSubmitButton={() => {
            if (showNewFolder) {
              if (!newFolderName) {
                return setError("Folder name can't be blank")
              }
              addFolder()
            }
            toast.success(`${campaignName} folder move to ${(showNewFolder && newFolderName) ? newFolderName : selectedFolder} folder.`)
            setSelectedFolder('')
            setNewFolderName('')
            setShowFolders(false)
            setShowMoveTo(false)
          }}
          onPressCancelButton={() => {
            setError('')
            setShowMoveTo(false)
            setSelectedFolder('')
            setShowFolders(false)
          }}
        />
      )}
      {showRename && (
        <CustomModal
          title='Rename'
          Content={() => (
            <div>
              <span>Rename <span className='fw-bold'>{campaignName}</span> campaign</span>
              <input
                type='text'
                data-kt-user-table-filter='search'
                style={{ width: 300 }}
                className='form-control form-control-solid px-6'
                placeholder='New Campaign Name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              {error && <span className='text-danger fs-6'>{error}</span>}
            </div>
          )}
          setShowModal={setShowRename}
          submitBtnClassName='btn-primary'
          cancelBtnTitle='Discard'
          onPressCancelButton={() => setShowRename(false)}
          onPressSubmitButton={() => {
            toast.success('Campaign successfully renamed.', { position: 'bottom-right' })
            setShowRename(false)
          }}
          submitBtnTitle='Rename'
        />
      )}
      {showArchive && (
        <CustomModal
          title='Archive'
          Content={() => (
            <span>The campaigns <span className='fw-bold'>{campaignName}</span> will be deactivated before it's archived. Do you confirm you want to archive this campaign?</span>
          )}
          setShowModal={setShowArchive}
          submitBtnClassName='btn-primary'
          cancelBtnTitle='Discard'
          onPressCancelButton={() => setShowArchive(false)}
          onPressSubmitButton={() => setShowArchive(false)}
          submitBtnTitle='Archive'
        />
      )}
      {selected.length > 0 && (
        <div
          style={{
            position: 'fixed',
            zIndex: 99999,
            bottom: 15,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#99A1B7'
            }}
            className='px-4 py-2 bg-gray-600 rounded d-flex align-items-center gap-2'>
            <span className='text-white fs-5 me-2'>{selected.length} campaigns selected</span>
            <button onClick={() => clearSelected()} className='btn btn-secondary btn-sm py-2 px-4'>Deselect</button>
            <button onClick={(e) => { e.preventDefault(); setShowMoveTo(true) }} className='btn btn-secondary btn-sm py-2 px-4'>Move to</button>
            <button onClick={() => setShowArchive(true)} className='btn btn-secondary btn-sm py-2 px-4'>Archive</button>
          </div>
        </div>
      )}
      {showRestore && (
        <CustomModal
          title='Restore'
          Content={() => (
            <span>Your campaign <span className='fw-bold'>{campaignName}</span> will be restored. You will find it under <span className='fw-bold'>All Folders</span>.</span>
          )}
          cancelBtnTitle='Discard'
          submitBtnTitle='Restore'
          onPressSubmitButton={() => {
            toast.success(`Campaign ${campaignName} successfully restored`)
            setShowRestore(false)
          }}
          onPressCancelButton={() => {
            setShowRestore(false)
          }}
          submitBtnClassName='btn-primary'
          setShowModal={setShowRestore}
        />
      )}
      {showDelete && (
        <CustomModal
          title='Delete Campaign'
          Content={() => (
            <span>Your campaign <span className='fw-bold'>{campaignName}</span>, its stats and <span className='fw-bold'>data will be lost forever</span>. Proceed anyways?</span>
          )}
          cancelBtnTitle='Discard'
          submitBtnTitle='Delete'
          onPressSubmitButton={() => {
            toast.success(`Campaign ${campaignName} successfully deleted`)
            setShowDelete(false)
          }}
          onPressCancelButton={() => {
            setShowDelete(false)
          }}
          submitBtnClassName='btn-danger'
          setShowModal={setShowDelete}
        />
      )}
      {showDuplucate && (
        <CustomModal
          title='Duplucate Campaign'
          Content={() => {

            return (
              <div className='d-flex flex-column'>
                <span>Duplicate campaign <span className='fw-bold'>{campaignName}</span> into:</span>
                <div style={{ width: 230, marginTop: 16 }}>
                  <span className='fw-bold m-0'>Website</span>
                  <div style={{ width: 230 }} onClick={() => setShowDomains(!showDomains)} className='position-relative bg-white border px-6 py-2 d-flex align-items-center justify-content-between cursor-pointer'>
                    <span className='fs-6'>{selectedDomain ? selectedDomain.label : domainList[0].label}</span>
                    <IoIosArrowDown />
                  </div>
                  {showDomains && (
                    <div className='d-flex flex-column bg-white pt-2 shadow' style={{ width: 230 }}>
                      {domainList.map((domain, index) => {
                        return <div onClick={() => {
                          setSelectedDomain(domain)
                          setShowDomains(false)
                        }} className='w-100 px-6 py-3 cursor-pointer'>{domain.label}</div>
                      })}
                    </div>
                  )}
                </div>
                <div style={{ width: 230, marginTop: 16 }}>
                  <span className='fw-bold m-0'>Folder</span>
                  <div style={{ width: 230 }} onClick={() => setShowFolders(!showFolders)} className='position-relative bg-white border px-6 py-2 d-flex align-items-center justify-content-between cursor-pointer'>
                    <span className='fs-6'>{showNewFolder ? 'Add Folder' : selectedFolder ? selectedFolder : files[0].name}</span>
                    <IoIosArrowDown />
                  </div>
                  {showFolders && (
                    <div className='d-flex flex-column bg-white pt-2 shadow' style={{ width: 230 }}>
                      {files.map((file, index) => {
                        if (index === 1) return null
                        return <div onClick={() => {
                          setSelectedFolder(file.name)
                          setShowFolders(false)
                          setShowNewFolder(false)
                        }} className='w-100 px-6 py-3 cursor-pointer'>{file.name}</div>
                      })}
                      <div style={{ height: 0.5, width: '100%' }} className='bg-secondary my-1' />
                      <div onClick={() => {
                        setShowFolders(false)
                        setShowNewFolder(true)
                      }} className='w-100 px-6 py-3 cursor-pointer'>Add Folder</div>
                    </div>
                  )}
                  {showNewFolder && (
                    <>
                      <input
                        type='text'
                        data-kt-user-table-filter='search'
                        style={{ width: 230 }}
                        className='form-control form-control-solid px-6 mt-3'
                        placeholder='New Folder Name'
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                      />
                      {error && <span className='text-danger fs-6'>{error}</span>}
                    </>
                  )}
                </div>
                <div style={{ width: 230, marginTop: 16 }}>
                  <span className='fw-bold m-0'>AB Test</span>
                  <div style={{ width: 230 }} onClick={() => setShowABs(!showABs)} className='position-relative bg-white border px-6 py-2 d-flex align-items-center justify-content-between cursor-pointer'>
                    <span className='fs-6'>{selectedAB ? selectedAB.name : 'None'}</span>
                    <IoIosArrowDown />
                  </div>
                  {showABs && (
                    <div className='d-flex flex-column bg-white pt-2 shadow' style={{ width: 230 }}>
                      <div onClick={() => {
                        setSelectedAB(null)
                        setShowABs(false)
                      }} className='w-100 px-6 py-3 cursor-pointer'>None</div>
                      {ABs.map((ab, index) => {
                        return <div onClick={() => {
                          setSelectedAB(ab)
                          setShowABs(false)
                        }} className='w-100 px-6 py-3 cursor-pointer'>{ab.name}</div>
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          }}
          cancelBtnTitle='Discard'
          submitBtnTitle='Duplicate'
          onPressSubmitButton={() => {
            toast.success(`Campaign ${campaignName} successfully duplucated ${selectedFolder} folder.`, { position: 'bottom-right' })
            setShowDuplucate(false)
          }}
          onPressCancelButton={() => {
            setShowDuplucate(false)
          }}
          submitBtnClassName='btn-primary'
          setShowModal={setShowDuplucate}
        />
      )}
      <a
        href='#'
        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='dots-horizontal' className='fs-2 m-0' />
      </a>
      {!_showArchive ? (
        <div
          className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-175px py-4'
          data-kt-menu='true'
        >

          <div onClick={() => { setShowDuplucate(true) }} className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              Duplicate
            </div>
          </div>
          <Link to={'/preview'} target='_blank' className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              Preview
            </div>
          </Link>
          <div onClick={() => { toast.success(`A/B testing successfully activated for campaign ${campaignName}`, { position: 'bottom-right' }) }} className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              A/B Test
            </div>
          </div>
          <div onClick={() => { setShowRename(true) }} className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              Rename
            </div>
          </div>
          <div onClick={() => { toast.success('We are generating the export. You will receive it via email when it is ready.', { position: 'bottom-right' }) }} className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              Export Data
            </div>
          </div>
          <Link to={`/analytics/${id}`} className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              See Analytics
            </div>
          </Link>
          <div onClick={() => setShowMoveTo(true)} className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              Move to Folder
            </div>
          </div>
          <div onClick={() => setShowArchive(true)} className='menu-item px-3'>
            <div
              className='menu-link px-3'
            >
              Archive
            </div>
          </div>
        </div>
      ) : (
        <div
          className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-175px py-4'
          data-kt-menu='true'
        >
          <div className='menu-item px-3' onClick={() => setShowRestore(true)}>
            <div
              className='menu-link px-3'
            >
              Restore
            </div>
          </div>
          <div className='menu-item px-3' onClick={() => setShowDelete(true)}>
            <div
              className='menu-link px-3'
            >
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { PopupActionsCell }
