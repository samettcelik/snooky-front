import { useEffect } from 'react'
import { KTIcon } from '../../../../../../_metronic/helpers'
import { deleteDomain } from '../../core/_requests'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { toast } from 'react-toastify'
import { SnookyClient } from '../../../../../modules/Request'
import { useAtom } from 'jotai'
import { domainAtom } from '../../../../../../store/jotai/DomainAtom'

const DeleteModal = ({ setShowModal, domain, id }: { setShowModal: any, domain: string, id: number }) => {
    const [domainsStore, setDomains] = useAtom(domainAtom)
    useEffect(() => {
        document.body.classList.add('modal-open')
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])

    const _deleteDomain = async () => {
        const data: any = await deleteDomain(id)
        if (data) {
            const domains = await SnookyClient.GetDomains()
            if (domains.data.length > 0) {
                setDomains({ ...domainsStore, domains: domains.data })
            }
            toast.success(data.message)
            setShowModal(false)
            refetch()
        }
    }

    const { refetch } = useQueryResponse()
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
                            <h2 className='fw-bolder'>Delete Website</h2>
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
                                        const data: any = await _deleteDomain()
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
