import React, { useState } from 'react'
import moment from 'moment';

const NotificationPage = () => {
    const [notificationList, setNotificationList] = useState([
        { title: "Black Friday Strategy: 11 Ideas & Tips 🏷️", read: false, description: "Lorem text lorem text lorem text lorem text", createDate: new Date() },
        { title: "Notification 2", read: false, description: "Lorem text lorem text lorem text lorem text", createDate: new Date() },
        { title: "Black Friday Strategy: 11 Ideas & Tips 🏷️", read: true, description: "Lorem text lorem text lorem text lorem text", createDate: new Date() },
        { title: "Notification 2", read: true, description: "Lorem text lorem text lorem text lorem text", createDate: new Date() },
        { title: "Black Friday Strategy: 11 Ideas & Tips 🏷️", read: true, description: "Lorem text lorem text lorem text lorem text", createDate: new Date() },
    ]);
    return (
        <>
            {/* begin::Row */}
            <div className='row g-5 g-xl-8'>
                <div className='col-12'>
                    {notificationList?.length > 0 ? (
                        <>
                            {notificationList?.map((notification, index) => (<>
                                <div className="border border-secondary rounded mb-6 position-relative" key={index}>
                                    {!notification.read && (
                                        <div
                                            className='w-10px h-10px rounded-circle bg-danger'
                                            style={{
                                                position: 'absolute',
                                                left: -3,
                                                top: -3
                                            }}
                                        />
                                    )}
                                    <div className="card-body p-5">
                                        <div className='d-flex justify-content-between mb-1'>
                                            <h4 className="card-title">
                                                {notification.title}
                                            </h4>
                                            <span className='text-gray-700' style={{fontSize: '1.1rem', fontWeight: 500}}><small>{moment(notification.createDate).format('DD.MM.YYYY, HH:mm')}</small></span>
                                        </div>
                                        <span className='fs-lg fw-semibold'>
                                            {notification.description}
                                        </span>
                                    </div>
                                </div>
                            </>))}
                        </>
                    ) : (
                        <>
                            <div className="card">
                                <div className="card-body p-5 text-center">No Notifications</div>
                            </div>
                        </>
                    )}
                </div>

            </div>
            {/* end::Row */}


        </>
    )
}

export { NotificationPage }
