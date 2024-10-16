import { useEffect } from 'react'
import { KTIcon } from '../../../../../../_metronic/helpers'

const DeleteModal = ({ setShowModal, domain }: { setShowModal: any, domain: string }) => {
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
                id='kt_modal_add_coupons'
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
                            <h2 className='fw-bolder'>Add Coupons</h2>
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
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            <p className='text-start text-gray-800 fw-medium'>You're about to delete <span className='fw-bold text-gray-900'>{domain}</span> from your account. All campaigns and data will be lost forever.</p>
                            <div className='text-center pt-15'>
                                <button
                                    type='reset'
                                    onClick={() => setShowModal(false)}
                                    className='btn btn-light me-3'
                                    data-kt-users-modal-action='cancel'
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        setShowModal(false)
                                        // await deleteItem.mutateAsync()
                                    }}
                                >
                                    <span className="indicator-label">Delete</span>
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

export { DeleteModal }
