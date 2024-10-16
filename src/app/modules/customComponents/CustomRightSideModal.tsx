import React, { useEffect } from 'react'
import { KTIcon, WithChildren } from '../../../_metronic/helpers'
type Props = {
    setShowModal: Function,
    title: string,
    Content: Function,
    submitBtnTitle?: string,
    cancelBtnTitle?: string,
    onPressSubmitButton?: Function,
    onPressCancelButton?: Function,
    submitBtnClassName: string
}

const CustomRightSideModal: React.FC<Props> = ({ setShowModal, title, Content, submitBtnTitle, cancelBtnTitle, onPressCancelButton, onPressSubmitButton, submitBtnClassName }) => {
    useEffect(() => {
        document.body.classList.add('modal-open')
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])

    return (
        <>
            <div
                className='modal fade show d-block modal-lg'
                id='kt_modal_add_user'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, height: '100dvh', minHeight: '100dvh', maxHeight: '100dvh', minWidth: '35%' }} className='mw-900px'>
                    <div className='modal-content h-100 rounded-0 mw-900px'>
                        <div className='modal-header'>
                            <h2 className='fw-bolder'>{title}</h2>
                            <div
                                className='btn btn-icon btn-sm btn-active-icon-primary'
                                data-kt-users-modal-action='close'
                                onClick={() => setShowModal(false)}
                                style={{ cursor: 'pointer' }}
                            >
                                <KTIcon iconName='cross' className='fs-1' />
                            </div>
                        </div>
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-5'>
                            <div className='text-start text-gray-800 fw-medium'>
                                {Content && Content()}
                            </div>
                            <div className='text-center pt-15'>
                                {cancelBtnTitle && (
                                    <button
                                        type='reset'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setShowModal(false)
                                            if (onPressCancelButton) {
                                                onPressCancelButton()
                                            }
                                        }}
                                        className='btn btn-light me-3'
                                        data-kt-users-modal-action='cancel'
                                    >
                                        {cancelBtnTitle}
                                    </button>
                                )}
                                {submitBtnTitle && (
                                    <button
                                        type="submit"
                                        className={`btn ${submitBtnClassName ? submitBtnClassName : 'btn-success'}`}
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            if (onPressSubmitButton) {
                                                onPressSubmitButton()
                                            }
                                        }}
                                    >
                                        <span className="indicator-label">{submitBtnTitle}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </>
    )
}

export { CustomRightSideModal }