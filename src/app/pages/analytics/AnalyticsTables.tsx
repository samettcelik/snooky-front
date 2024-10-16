import React from 'react'
import { FiRefreshCcw } from 'react-icons/fi'
import CampaignsTable from './tables/CampaignsTable'
import PagesTable from './tables/PagesTable'
import CountriesTable from './tables/CountriesTable'
import DevicesTable from './tables/DevicesTable'

function AnalyticsTables() {
    return (
        <div className='d-flex flex-wrap w-100 justify-content-between align-items-start' style={{
            rowGap: 30
        }}>
            <div
                className='shadow py-6 px-5 rounded d-flex flex-column gap-4'
                style={{
                    width: '48%'
                }}
            >
                <div className="d-flex justify-content-between">
                    <h2 style={{ userSelect: 'none' }} className="text-dark fw-bold fs-5 mb-0">Top Campaigns</h2>
                    <div className="d-flex align-items-center gap-2">
                        <span className='d-flex gap-2 fs-7 align-items-center text-gray-600'>
                            <FiRefreshCcw />
                            <span style={{ userSelect: 'none' }}>It refreshes every 5 minutes.</span>
                        </span>
                    </div>
                </div>
                <CampaignsTable />
            </div>
            <div
                className='shadow py-6 px-5 rounded d-flex flex-column gap-4'
                style={{
                    width: '48%'
                }}
            >
                <div className="d-flex justify-content-between">
                    <h2 style={{ userSelect: 'none' }} className="text-dark fw-bold fs-5 mb-0">Top Pages</h2>
                    <div className="d-flex align-items-center gap-2">
                        <span className='d-flex gap-2 fs-7 align-items-center text-gray-600'>
                            <FiRefreshCcw />
                            <span style={{ userSelect: 'none' }} >It refreshes every 5 minutes.</span>
                        </span>
                    </div>
                </div>
                <PagesTable />
            </div>
            <div
                className='shadow py-6 px-5 rounded d-flex flex-column gap-4'
                style={{
                    width: '48%'
                }}
            >
                <div className="d-flex justify-content-between">
                    <h2 style={{ userSelect: 'none' }} className="text-dark fw-bold fs-5 mb-0">Top Countries</h2>
                    <div className="d-flex align-items-center gap-2">
                        <span className='d-flex gap-2 fs-7 align-items-center text-gray-600'>
                            <FiRefreshCcw />
                            <span style={{ userSelect: 'none' }}>It refreshes every 5 minutes.</span>
                        </span>
                    </div>
                </div>
                <CountriesTable />
            </div>
            <div
                className='shadow py-6 px-5 rounded d-flex flex-column gap-4'
                style={{
                    width: '48%'
                }}
            >
                <div className="d-flex justify-content-between">
                    <h2 style={{ userSelect: 'none' }} className="text-dark fw-bold fs-5 mb-0">Devices</h2>
                    <div className="d-flex align-items-center gap-2">
                        <span className='d-flex gap-2 fs-7 align-items-center text-gray-600'>
                            <FiRefreshCcw />
                            <span style={{ userSelect: 'none' }}>It refreshes every 5 minutes.</span>
                        </span>
                    </div>
                </div>
                <DevicesTable />
            </div>
        </div>
    )
}

export default AnalyticsTables
