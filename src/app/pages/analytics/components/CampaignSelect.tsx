import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { KTIcon } from '../../../../_metronic/helpers'

function CampaignSelect({ allCampaigns, activeCampaign, setActiveCampaign }) {

    const [campaigns, setCampaigns] = useState(allCampaigns)
    const [searchTerm, setSearchTerm] = useState<any>('')
    const [show, setShow] = useState<boolean>(false)
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
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
        if (!searchTerm) return setCampaigns(allCampaigns)
        const newArray = allCampaigns.filter(obj => {
            return obj.name.toLowerCase().includes(searchTerm.toLowerCase())
        });
        setCampaigns([...newArray])
    }, [searchTerm])

    return (
        <div className='d-flex'>
            <div
                ref={wrapperRef}
                onClick={(e) => {
                    e.preventDefault()
                    setShow(!show)
                }}
                className='position-relative bg-white border px-6 py-2 rounded d-flex align-items-center cursor-pointer'
                style={{
                    height: 38,
                    width: 250
                }}
            >
                <span className='fs-6'>All Campaigns</span>
                <IoIosArrowDown style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    width: 18,
                    height: 18
                }} />
                {show && (
                    <div
                        className='bg-white rounded border shadow d-flex flex-md-row flex-column px-2'
                        style={{
                            position: 'absolute',
                            width: 345,
                            left: 0,
                            top: 40,
                            zIndex: 200
                        }}
                    >
                        <div onClick={(e) => e.stopPropagation()} className='d-flex flex-column' style={{ width: 345 }}>
                            <div className='d-flex align-items-center position-relative px-6 py-3'>
                                <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-3' />
                                <input
                                    type='text'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid ps-12 py-2'
                                    placeholder='Search Campaign'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className='px-6 pt-3 fw-bold pb-2 border-bottom'>
                                Name
                            </div>
                            {campaigns.map((cp, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => { setHoverIndex(index) }}
                                    onMouseLeave={() => { setHoverIndex(null) }}
                                    onClick={(e) => {
                                        setActiveCampaign(cp)
                                        setShow(false)
                                    }}
                                    className='px-6 py-3'
                                    style={{ width: '100%', background: hoverIndex === index ? '#F9F9F9' : '#ffffff' }}
                                >
                                    <span className='fs-6 fw-semibold'>{cp.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CampaignSelect
