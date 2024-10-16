import { useEffect, useRef, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { CustomModal } from "../../../../../../modules/customComponents/CustomModal"
import { toast } from "react-toastify"
import { KTIcon } from "../../../../../../../_metronic/helpers"
import { left } from "@popperjs/core"
import { domainAtom } from "../../../../../../../store/jotai/DomainAtom"
import { useAtom } from "jotai"

const FileSelect = ({ files, setFiles }) => {
    const [domains, setDomains] = useAtom(domainAtom)
    const [hoverIndex, setHoverIndex] = useState(null)
    const [show, setShow] = useState(false)
    const [showArchiveModal, setShowArchiveModal] = useState(false)
    const [renameFolderModal, setRenameFolderModal] = useState(false)
    const [rename, setRename] = useState('')
    const [showAddFolderModal, setShowAddFolderModal] = useState(false)
    const [newFolderName, setNewFolderName] = useState('')
    const [error, setError] = useState(null)
    const [showEditDropIndex, setShowEditDropIndex] = useState(null)
    const [activeText, setActiveText] = useState('')

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        setFiles([
            { name: 'All Folder', value: true },
            { name: 'Archive', value: false },
            { name: 'Yiğit', value: false },
            { name: 'Burak', value: false }
        ])
    }, [])

    const selectFile = (file) => {
        let _files = files
        let newArr = []
        setShowEditDropIndex(null)
        if (file.name === 'All Folder' || file.name === 'Archive') {
            _files.map(f => {
                if (f.name === 'All Folder' && file.name === 'All Folder') {
                    newArr.push({ name: f.name, value: true })
                } else if (f.name === 'Archive' && file.name === 'Archive') {
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
                } else if (f.name === file.name) {
                    newArr.push({ name: f.name, value: !f.value })
                } else {
                    newArr.push({ name: f.name, value: f.value })
                }
            })
        }

        let trueCount = 0
        newArr.map((f, i) => {
            if (f.value) {
                trueCount += 1
            }
        })
        if (trueCount === 0) {
            newArr[0].value = true
        }

        setFiles(newArr)
        setShowEditDropIndex(null)
    }

    useEffect(() => {
        let fText = ''
        files.map((f, i) => {
            if (i !== 0 && f.value) {
                if (!fText) {
                    fText += f.name
                } else {
                    fText += ', ' + f.name
                }
            }
        })
        setActiveText(fText)
    }, [files])

    const addFolder = () => {
        let _newArr = files
        _newArr.push({ name: newFolderName, value: false })
        setFiles([..._newArr])
        toast.success('New folder added')
        setShowAddFolderModal(false)
        setNewFolderName('')
    }

    return (
        <div
            ref={wrapperRef}
            onClick={(e) => {
                e.preventDefault()
                setShow(!show)
            }}
            className='position-relative bg-white border ps-6 pe-10 py-2 d-flex align-items-center cursor-pointer'
            style={{
                height: 38,
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7
            }}
        >
            {renameFolderModal !== false &&
                <CustomModal
                    title="Rename Folder"
                    Content={() => (
                        <div className="d-flex flex-column gap-4">
                            <span>You are about to rename the folder <span className="fw-bold">{files[renameFolderModal].name}.</span></span>
                            <div className="d-flex flex-column">
                                <input
                                    type='text'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid w-250px'
                                    placeholder='Folder name'
                                    value={rename}
                                    onChange={(e) => setRename(e.target.value)}
                                />
                                {error && <span className="text-danger mt-1">{error}</span>}
                            </div>
                        </div>
                    )}
                    onPressSubmitButton={() => {
                        files[renameFolderModal].name = rename
                        setShowEditDropIndex(null)
                        setRenameFolderModal(false)
                    }}
                    onPressCancelButton={() => {
                        setRenameFolderModal(false)
                    }}
                    setShowModal={setRenameFolderModal}
                    submitBtnClassName="btn-primary"
                    cancelBtnTitle="Discard"
                    submitBtnTitle="Add"
                />
            }
            {showArchiveModal !== false && (
                <CustomModal
                    title="Archive Folder"
                    Content={() => (
                        <div className="d-flex flex-column gap-4">
                            <span>You are about to deactivate and archive all the campaigns from the folder <span className="fw-bold">{files[showArchiveModal].name}</span>. Do you confirm you want to archive this folder?</span>
                        </div>
                    )}
                    onPressSubmitButton={() => {
                        let _files = []
                        files.map((x, i) => {
                            if (i !== showArchiveModal) {
                                _files.push(x)
                            }
                        })
                        setFiles(_files)
                        setShowEditDropIndex(null)
                        setShowArchiveModal(false)
                    }}
                    onPressCancelButton={() => {
                        setShowEditDropIndex(null)
                        setShowArchiveModal(false)
                    }}
                    setShowModal={setShowArchiveModal}
                    submitBtnClassName="btn-primary"
                    cancelBtnTitle="Discard"
                    submitBtnTitle="Archive"
                />
            )}
            {showAddFolderModal &&
                <CustomModal
                    title="Add Folder"
                    Content={() => (
                        <div className="d-flex flex-column gap-4">
                            <span>You are about to create a new folder in the website <span className="fw-bold">{domains.domains[0].name.slice(8)}</span></span>
                            <div className="d-flex flex-column">
                                <input
                                    type='text'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid w-250px'
                                    placeholder='Folder name'
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                />
                                {error && <span className="text-danger mt-1">{error}</span>}
                            </div>
                        </div>
                    )}
                    onPressSubmitButton={() => {
                        if (newFolderName.length < 3) {
                            return setError('Minimum 2 symbols')
                        }
                        addFolder()
                    }}
                    onPressCancelButton={() => {
                        setShowAddFolderModal(false)
                    }}
                    setShowModal={setShowAddFolderModal}
                    submitBtnClassName="btn-primary"
                    cancelBtnTitle="Discard"
                    submitBtnTitle="Add"
                />
            }
            <span className='fs-6'>Folder</span>
            <IoIosArrowDown style={{
                position: 'absolute',
                right: 10,
                top: 10,
                width: 18,
                height: 18
            }} />
            {show && (
                <div
                    className='bg-white rounded border shadow d-flex flex-md-row flex-column'
                    style={{
                        position: 'absolute',
                        width: '100%',
                        right: 0,
                        top: 40,
                        zIndex: 200
                    }}
                >
                    <div className='d-flex flex-column bg-white pt-2' style={{ width: 230 }}>
                        <span style={{ cursor: 'default' }} className="ms-6 mb-2 fw-semibold">All Folders <span className="text-secondary">({files.length - 1})</span></span>
                        {files.map((file, index) => {
                            if (index === 1) {
                                return null
                            }
                            return (
                                <div
                                    key={index}
                                    onMouseEnter={() => { setHoverIndex(index) }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                    onMouseLeave={() => { setHoverIndex(null) }}
                                    className='px-6 py-3 d-flex align-items-center justify-content-between'
                                    style={{ width: 230, background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                                >
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            selectFile(file)
                                            setShowEditDropIndex(null)
                                        }}
                                        className="d-flex align-items-center gap-2"
                                    >
                                        <div className="container">
                                            <input
                                                className="custom"
                                                type='checkbox'
                                                id="button"
                                                checked={file.value}
                                            />
                                            <span class="checkmark"></span>
                                        </div>
                                        <span className='fs-6 fw-semibold'>{file.name}</span>
                                    </div>
                                    {index !== 0 && (
                                        <div style={{ position: 'relative' }}>
                                            <div
                                                onClick={() => {
                                                    if (index === showEditDropIndex) {
                                                        setShowEditDropIndex(null)
                                                        console.log('Kapattı');
                                                    } else {
                                                        console.log('Açtı');
                                                        setShowEditDropIndex(index)
                                                    }
                                                }}
                                                className=""
                                            >
                                                <KTIcon iconName='dots-horizontal' className='fs-2 m-0' />
                                            </div>
                                            {showEditDropIndex === index && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        width: 200,
                                                        background: 'white',
                                                        zIndex: 999999
                                                    }}
                                                    className="d-flex flex-column shadow rounded"
                                                >
                                                    <div
                                                        className="px-6 py-4 fs-6 fw-semibold"
                                                        style={{
                                                            background: hoverIndex === 20 ? '#F9F9F9' : '#ffffff'
                                                        }}
                                                        onClick={() => {
                                                            setRenameFolderModal(index)
                                                            setRename(file.name)
                                                        }}
                                                        onMouseEnter={() => { setHoverIndex(20) }}
                                                        onMouseLeave={() => { setHoverIndex(null) }}
                                                    >
                                                        Rename
                                                    </div>
                                                    <div
                                                        className="px-6 py-4 fs-6 fw-semibold"
                                                        style={{
                                                            background: hoverIndex === 21 ? '#F9F9F9' : '#ffffff'
                                                        }}
                                                        onClick={() => setShowArchiveModal(index)}
                                                        onMouseEnter={() => { setHoverIndex(21) }}
                                                        onMouseLeave={() => { setHoverIndex(null) }}
                                                    >
                                                        Archive
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                        <div
                            key={1}
                            onMouseEnter={() => { setHoverIndex(files.length + 1) }}
                            onMouseLeave={() => { setHoverIndex(null) }}
                            onClick={(e) => {
                                e.stopPropagation()
                                selectFile(files[1])
                            }}
                            className='px-6 py-3 d-flex align-items-center gap-2'
                            style={{ width: 230, background: hoverIndex === files.length + 1 ? '#F9F9F9' : '#ffffff' }}
                        >
                            <div className="container" onClick={(e) => {
                                e.stopPropagation()
                                selectFile(files[1])
                            }}>
                                <input
                                    className="custom"
                                    type='checkbox'
                                    id="button"
                                    checked={files[1].value}
                                />
                                <span class="checkmark"></span>
                            </div>
                            <span className='fs-6 fw-semibold'>{files[1].name}</span>
                        </div>
                        <div style={{ height: 0.5 }} className="bg-secondary" />
                        <div className="px-6 py-2">
                            <button
                                className="btn btn-primary btn-sm"
                                style={{
                                    width: 100,
                                    paddingTop: 5,
                                    paddingBottom: 5
                                }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowAddFolderModal(true)
                                }}
                            >Add Folder</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileSelect
