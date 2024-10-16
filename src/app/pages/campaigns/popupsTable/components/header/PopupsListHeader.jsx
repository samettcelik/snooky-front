import { useListView } from '../../core/ListViewProvider'
import { PopupsListToolbar } from './PopupsListToolbar'
import { PopupsListGrouping } from './PopupsListGrouping'
import { PopupsListSearchComponent } from './PopupsListSearchComponent'
import FileSelect from './components/FileSelect'
import StatusSelect from './components/StatusSelect'
import DeviceList from './components/DeviceSelect'
import SortSelect from './components/SortSelect'
import { useState } from 'react'
import { IoIosArrowDown, IoMdClose } from 'react-icons/io'
import './style.css'
import { CustomModal } from '../../../../../modules/customComponents/CustomModal'
import { toast } from 'react-toastify'
import { FiRefreshCcw } from "react-icons/fi";

const PopupsListHeader = ({ files, setFiles }) => {
  const { selected, clearSelected } = useListView()

  const [statusList, setStatusList] = useState([
    { name: 'Active', value: false },
    { name: 'Scheduled', value: false },
    { name: 'Draft', value: false },
    { name: 'Stopped', value: false },
    { name: 'Ended', value: false },
  ])
  const [deviceList, setDeviceList] = useState([
    { name: 'Mobile', value: false },
    { name: 'Desktop', value: false },
    { name: 'Tablet', value: false },
  ])
  const [showMoveTo, setShowMoveTo] = useState(false)
  const [error, setError] = useState(false)
  const [showFolders, setShowFolders] = useState(false)
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('')
  const [showArchive, setShowArchive] = useState(false)


  const addFolder = () => {
    let _newArr = files
    _newArr.push({ name: newFolderName, value: false })
    setFiles([..._newArr])
    toast.success('New folder added')
    setShowMoveTo(false)
    setNewFolderName('')
  }

  return (
    <div className='card-header d-flex flex-column'>
      {showMoveTo && (
        <CustomModal
          title='Move to'
          Content={() => (
            <div className='d-flex flex-column gap-2'>
              <span>Move {selected.length} campaigns to folder : </span>
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
            toast.success(`${selected.length} folders move to ${(showNewFolder && newFolderName) ? newFolderName : selectedFolder} folder.`)
            setSelectedFolder('')
            setNewFolderName('')
            setShowFolders(false)
            clearSelected()
            setShowMoveTo(false)
          }}
          onPressCancelButton={() => {
            setShowMoveTo(false)
            setSelectedFolder('')
            setShowFolders(false)
          }}
        />
      )}
      {showArchive && (
        <CustomModal
          title='Archive'
          Content={() => (
            <span>The campaigns <span className='fw-bold'>Untitled campaign</span> will be deactivated before it's archived. Do you confirm you want to archive this campaign?</span>
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
      <div className='d-flex align-items-center justify-content-between gap-10 border-0 pt-6'>
        <div className='d-flex align-items-center'>
          <PopupsListSearchComponent />
          <FileSelect files={files} setFiles={setFiles} />
          <StatusSelect statusList={statusList} setStatusList={setStatusList} />
          <DeviceList deviceList={deviceList} setDeviceList={setDeviceList} />
        </div>
        <div className='d-flex align-items-center gap-2'>
          <span className='d-flex gap-2 align-items-center text-gray-600'>
            <FiRefreshCcw />
            <span>It refreshes every 5 minutes.</span>
          </span>
          <SortSelect />
        </div>
        {/* <div className='card-toolbar'>
        {selected.length > 0 ? <PopupsListGrouping /> : <PopupsListToolbar />}
      </div> */}
      </div>
      <div className='d-flex gap-2 align-items-center flex-wrap mb-2'>
        {files.length > 0 && files.map(fl => (
          <>
            {fl.name !== 'All Folder' && fl.value && (
              <div className='bg-light-secondary px-4 py-1 rounded fw-medium d-flex align-items-center gap-1'>
                Folder is {fl.name}
                <IoMdClose className='cursor-pointer' onClick={() => {
                  let _files = files
                  let newArr = []
                  if (fl.name === 'All Folder' || fl.name === 'Archive') {
                    _files.map(f => {
                      if (f.name === 'All Folder' && fl.name === 'All Folder') {
                        newArr.push({ name: f.name, value: true })
                      } else {
                        newArr.push({ name: f.name, value: false })
                      }
                    })
                  } else {
                    _files.map(f => {
                      if (f.name === 'All Folder') {
                        newArr.push({ name: f.name, value: false })
                      } else if (f.name === 'Archive') {
                        newArr.push({ name: f.name, value: false })
                      } else if (f.name === fl.name) {
                        newArr.push({ name: f.name, value: !f.value })
                      } else {
                        newArr.push({ name: f.name, value: f.value })
                      }
                    })
                  }

                  let trueCount = 0
                  newArr.map((f: any, i) => {
                    if (f.value) {
                      trueCount += 1
                    }
                  })
                  if (trueCount === 0) {
                    newArr[0].value = true
                  }

                  setFiles(newArr)
                }} />
              </div>
            )}
          </>
        ))}
        {statusList.length > 0 && statusList.map((st, index) => (
          <>
            {st.value && (
              <div className='bg-light-secondary px-4 py-1 rounded fw-medium d-flex align-items-center gap-1'>
                Status is {st.name}
                <IoMdClose className='cursor-pointer' onClick={() => {
                  let list = statusList
                  list[index].value = false
                  setStatusList([...list])
                }} />
              </div>
            )}
          </>
        ))}
        {deviceList.length > 0 && deviceList.map((st, index) => (
          <>
            {st.value && (
              <div className='bg-light-secondary px-4 py-1 rounded fw-medium d-flex align-items-center gap-1'>
                Device is {st.name}
                <IoMdClose className='cursor-pointer' onClick={() => {
                  let list = deviceList
                  list[index].value = false
                  setDeviceList([...list])
                }} />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export { PopupsListHeader }
