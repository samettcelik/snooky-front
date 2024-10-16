import React from 'react'
const data = [
    {
        name: 'Desktop',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        name: 'Mobile',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
    {
        name: 'Tablet',
        displays: '47.3K',
        clicks: '8.5K',
        ctr: '38%',
    },
]

function DevicesTable() {
    return (
        <div className='d-flex flex-column w-100 mt-2'>
            <div className='d-flex border-bottom pb-2'>
                <div
                    style={{
                        width: '40%'
                    }}
                >
                    <span style={{ userSelect: 'none' }} className='fw-bold'>Device</span>
                </div>
                <div
                    style={{
                        width: '20%'
                    }}
                >
                    <span style={{ userSelect: 'none' }} className='fw-bold'>Display</span>
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
                        width: '20%'
                    }}
                >
                    <span style={{ userSelect: 'none' }} className='fw-bold'>CTR</span>
                </div>
            </div>
            <div className='d-flex flex-column gap-1'>
                {data.map((device, i) => (
                    <div key={i} className='d-flex'>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '40%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{device.name}</span>
                        </div>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '20%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{device.displays}</span>
                        </div>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '20%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{device.clicks}</span>
                        </div>
                        <div
                            className='py-1 d-flex align-items-center'
                            style={{
                                width: '20%'
                            }}
                        >
                            <span style={{ userSelect: 'none' }} className='fw-semibold text-gray-700'>{device.ctr}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DevicesTable
