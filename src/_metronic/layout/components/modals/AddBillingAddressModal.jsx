import { React } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ModalComponent from './ModalComponent'
import countries from '../../../helpers/AllCountry';
import Select from "react-select";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
function AddBillingAddressModal() {

    const addAddress = () => {

        toast.success('Added address', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    }

    return (
        <>
            <ToastContainer />
            <ModalComponent ids={'AddBillingAddressModal'} onSubmit={addAddress} title={'Add New Address'} submitText={'Submit'} submitBg={'btn btn-primary'} discardText={'Discard'} discardBg={'btn btn-light'}>
                <div className="menu-item">
                    <label className='fw-bold fs-6 mb-2 mt-2'>Legal company name</label>
                    <div>
                        <input
                            placeholder='Legal company name'
                            type='text'
                            name='companyName'
                            className={'form-control form-control-solid mb-3 mb-lg-0'}
                            autoComplete='off'
                        />
                        <span className='fs-sm text-gray-700'>This is the name registered under your tax ID.</span>
                    </div>
                    <label className='fw-bold fs-6 mb-2 mt-4 d-flex gap-2 align-items-center'>
                        Tax ID
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip-user-websites">
                                    <div className='d-flex flex-column'>
                                        <span>This is your tax identification number in your country of establishment. You may know this as your VAT, GST identification number or business number.</span>
                                    </div>
                                </Tooltip>
                            }
                        >
                            <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
                                <i className="bi bi-info-circle-fill"></i>
                            </span>
                        </OverlayTrigger>
                    </label>
                    <div>
                        <input
                            placeholder='Tax ID'
                            type='text'
                            name='name'
                            className={'form-control form-control-solid mb-3 mb-lg-0'}
                            autoComplete='off'
                        />
                        <span className='fs-sm text-gray-700'>This will apper on your invoice.</span>
                    </div>
                    <label className='fw-bold fs-6 mb-2 mt-4'>Country</label>
                    <Select
                        options={countries}
                        placeholder="Country"
                        className="form-control form-control-solid p-0"
                    />
                    <label className='fw-bold fs-6 mb-2 mt-4'>City</label>
                    <input
                        placeholder='City'
                        type='text'
                        name='name'
                        className={'form-control form-control-solid mb-3 mb-lg-0'}
                        autoComplete='off'
                    />
                    <label className='fw-bold fs-6 mb-2 mt-4'>Zip Code</label>
                    <input
                        placeholder='Zip Code'
                        type='text'
                        name='name'
                        className={'form-control form-control-solid mb-3 mb-lg-0'}
                        autoComplete='off'
                    />
                    <label className='fw-bold fs-6 mb-2 mt-4'>Address</label>
                    <input
                        placeholder='Address'
                        type='text'
                        name='name'
                        className={'form-control form-control-solid mb-3 mb-lg-0'}
                        autoComplete='off'

                    />
                </div>
            </ModalComponent>
        </>
    )
}

export default AddBillingAddressModal