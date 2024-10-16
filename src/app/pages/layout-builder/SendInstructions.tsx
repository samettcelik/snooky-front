import { useEffect } from 'react'
import { KTIcon } from '../../../_metronic/helpers'

const SendInstructions = ({ setShowModal, email }: { setShowModal: any, email: string }) => {
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
                            <h2 className='fw-bolder'>Send instruction to your developer</h2>
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
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-4'>
                            <p className='text-start text-gray-800 fw-medium'>Instruction consists of setting up the code snippet to your website</p>
                            <div className='d-flex gap-4 align-items-center mt-10'>
                                <div className='bg-primary w-40px h-40px rounded-circle d-flex justify-content-center align-items-center'>
                                    <span className='text-gray-100 text-xl text-uppercase'>{email[0]}</span>
                                </div>
                                <p className='mt-3 text-gray-900 text-'>{email}</p>
                            </div>
                            <div className='h-2px bg-gray-300 mt-2' />
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
                                    className="btn btn-success"
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        setShowModal(false)
                                        // await deleteItem.mutateAsync()
                                    }}
                                >
                                    <span className="indicator-label">Send</span>
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

export { SendInstructions }
