import { useEffect } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'

const CancelModal = ({ setShowModal }: { setShowModal: any }) => {
    useEffect(() => {
        document.body.classList.add('modal-open')
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])

    return (
        <>
            <div
                className='modal fade show d-block'
                id='kt_modal_add_user'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>

                        <div className='modal-header'>
                            {/* begin::Modal title */}
                            <h2 className='fw-bolder'>Cancel scheduled payment?</h2>
                            {/* end::Modal title */}

                            {/* begin::Close */}
                            <div
                                className='btn btn-icon btn-sm btn-active-icon-primary'
                                data-kt-users-modal-action='close'
                                onClick={() => setShowModal(false)}
                                style={{ cursor: 'pointer' }}
                            >
                                <KTIcon iconName='cross' className='fs-1' />
                            </div>
                            {/* end::Close */}
                        </div>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-5'>
                            <p className='text-start text-gray-800 fw-medium'>You will permanently cancel this scheduled payment.</p>
                            <div className='text-center pt-15'>
                                <button
                                    type='reset'
                                    onClick={() => setShowModal(false)}
                                    className='btn btn-light me-3'
                                    data-kt-users-modal-action='cancel'
                                >
                                    Not Now
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        setShowModal(false)
                                    }}
                                >
                                    <span className="indicator-label">Cancel Payment</span>
                                </button>
                            </div>
                        </div>
                        {/* end::Modal body */}
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show'></div>
            {/* end::Modal Backdrop */}
        </>
    )
}

export { CancelModal }