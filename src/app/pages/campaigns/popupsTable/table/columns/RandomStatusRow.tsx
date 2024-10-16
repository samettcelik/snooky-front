import React, { useEffect, useRef, useState } from 'react'
import { KTIcon } from '../../../../../../_metronic/helpers'
import { IoIosArrowDown } from 'react-icons/io'
import { CustomModal } from '../../../../../modules/customComponents/CustomModal'
import { useAtom } from 'jotai'
import { campaignsArchiveAtom, showStatusDropAtom } from '../../../../../../store/jotai/CampaignTableAtoms'

function RandomStatusRow({ currentIndex, status, rand, lastIndex }) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [showDraft, setShowDraft] = useState<boolean>(false)
    const [showActive, setShowActive] = useState<boolean>(false)

    const [showArchives, setShowArchives] = useAtom(campaignsArchiveAtom)
    const showArchive = showArchives.show

    const [_showStatusDropIndex, setShowStatus] = useAtom(showStatusDropAtom)
    const showStatusDropIndex = _showStatusDropIndex.show

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);

    function useOutsideClick(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowStatus({ show: false })
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div className='w-100 d-flex align-items-center gap-1'>
            {showDraft && (
                <CustomModal
                    title='Revert to draft?'
                    Content={() => (
                        <span>If you proceed <span className='fw-bold'>Untitled Campaign</span> will no longer be visible on your website.</span>
                    )}
                    setShowModal={setShowDraft}
                    submitBtnClassName='btn-danger'
                    cancelBtnTitle='Discard'
                    submitBtnTitle='Revert to draft'
                    onPressCancelButton={() => setShowDraft(false)}
                    onPressSubmitButton={() => setShowDraft(false)}
                />
            )}
            {showActive && (
                <CustomModal
                    title='Active campaign?'
                    Content={() => (
                        <span><span className='fw-bold'>Untitled Campaign</span> will be live on your website.</span>
                    )}
                    setShowModal={setShowActive}
                    submitBtnClassName='btn-primary'
                    cancelBtnTitle='Cancel'
                    submitBtnTitle='Confirm'
                    onPressCancelButton={() => setShowActive(false)}
                    onPressSubmitButton={() => setShowActive(false)}
                />
            )}
            <span className={`px-2 badge fw-bolder 
      ${showArchive ? 'badge-secondary' : status === 'Active' ? 'badge-light-success'
                    : status === 'Scheduled' ? 'badge-light-warning'
                        : status === 'Draft' ? 'badge-light-primary' :
                            status === 'Stopped' ? 'badge-light-danger'
                                : 'badge-light-info'}`}>
                {showArchive ? 'Arcihve' : status}
            </span>
            {!showArchive && (
                <div onClick={(e) => e.stopPropagation()} className='position-relative'>
                    <div onClick={(e) => {
                        e.stopPropagation()
                        if (showStatusDropIndex === currentIndex + 1) {
                            setShowStatus({show: null})
                        } else {
                            setShowStatus({show: currentIndex + 1})
                        }                        
                    }}>
                        <IoIosArrowDown />
                    </div>
                    {showStatusDropIndex === currentIndex + 1 && (
                        <div
                            ref={wrapperRef}
                            style={{
                                position: 'absolute',
                                width: 200,
                                left: 0,
                                zIndex: 9999,
                                background: '#fff',
                                color: '#78829D',
                                marginTop: currentIndex === lastIndex - 1 ? (status === 'Draft' || status === 'Active') ? -60 : -100 : 0
                            }}
                            className='shadow'
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            {rand !== 0 && (
                                <div
                                    className='w-100 px-6 py-3 cursor-pointer text-start fw-medium fs-5'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowActive(true)
                                        setShowStatus({ show: false })
                                    }}
                                >
                                    Active
                                </div>
                            )}
                            {rand !== 2 && (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowDraft(true)
                                        setShowStatus({ show: false })
                                    }}
                                    className='w-100 px-6 py-3 cursor-pointer text-start fw-medium fs-5'
                                >
                                    Draft
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default RandomStatusRow
