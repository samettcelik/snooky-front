import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5'
import { CustomModal } from '../../../../../modules/customComponents/CustomModal'

function CouponDeactivateCell({ action }: { action: boolean }) {
    const [showModal, setShowModal] = useState<boolean>(false)

    const _randomArray = [true, false, false, false]
    let rand = Math.floor(Math.random() * 3)
    return (
        <div className='d-flex justify-content-end'>
            {showModal && (
                <CustomModal
                    title={action ? 'Deactivate Copuon List?' : 'Activate Copuon List?'}
                    Content={() => `You are about to ${action ? 'deactivate' : 'activate'} test-1. There might be some Campaigns using this coupon list. Are you sure`}
                    setShowModal={setShowModal}
                    cancelBtnTitle='Cancel'
                    submitBtnTitle={action ? 'Deactivate' : 'Acitvate'}
                    submitBtnClassName={action ? 'btn-danger' : 'btn-success'}
                />
            )}
            <div onClick={() => setShowModal(true)} className='d-flex align-items-center gap-1 text-primary cursor-pointer'>
                {action ? <IoPauseOutline style={{ fontSize: '1.2rem', marginBottom: 0.5 }} /> : _randomArray[rand] && <IoPlayOutline style={{ fontSize: '1.2rem', marginBottom: 0.5 }} />}
                <span>{action ? 'Deactivate' : _randomArray[rand] && 'Activate'}</span>
            </div>
        </div>
    )
}

export default CouponDeactivateCell
