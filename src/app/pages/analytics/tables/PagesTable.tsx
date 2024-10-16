import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
const data = [
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        url: 'https://example.com',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
]

function PagesTable() {
    const [currentPage, setCurrentPage] = useState(1)
    return (
        <div className='d-flex flex-column w-100 mt-2'>
            <div className='d-flex border-bottom pb-2'>
                <div
                    style={{
                        width: '45%'
                    }}
                >
                    <span style={{ userSelect: 'none' }} className='fw-bold'>URL Address</span>
                </div>
                <div
                    style={{
                        width: '20%'
                    }}
                >
                    <span style={{ userSelect: 'none' }} className='fw-bold'>Displays</span>
                </div>
                <div
                    style={{
                        width: '20%'
                    }}
                >
                    <span style={{ userSelect: 'none' }} className='fw-bold'>Clicks</span>
                </div>
                <div
                    style={{
                        width: '15%'
                    }}
                >
                    <span style={{ userSelect: 'none' }} className='fw-bold'>CTR</span>
                </div>
            </div>
            <div className='d-flex flex-column gap-1'>
                {data.map((page, i) => (
                    <div key={i} className='d-flex'>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '45%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{page.url}</span>
                        </div>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '20%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{page.displays}</span>
                        </div>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '15%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{page.clicks}</span>
                        </div>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '20%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{page.ctr}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='d-flex align-items-center justify-content-center pt-4 gap-4'>
                <div onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1)
                    }
                }} className={`rounded-circle border p-4 d-flex align-items-center justify-content-center ${currentPage !== 1 && 'cursor-pointer border-gray-300'}`}>
                    <IoIosArrowBack className={`${currentPage === 1 && 'text-gray-600'}`} />
                </div>
                <div style={{ userSelect: 'none', width: 40 }} className='fs-6 d-flex align-items-center justify-content-center'>
                    {currentPage}/10
                </div>
                <div onClick={() => {
                    if (currentPage < 10) {
                        setCurrentPage(currentPage + 1)
                    }
                }} className={`rounded-circle border p-4 d-flex align-items-center justify-content-center  ${currentPage !== 10 && 'cursor-pointer border-gray-300'}`}>
                    <IoIosArrowForward className={`${currentPage === 10 && 'text-gray-600'}`} />
                </div>
            </div>
        </div>
    )
}

export default PagesTable
