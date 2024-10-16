import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { CustomModal } from "../../../modules/customComponents/CustomModal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import countries from '../../../../_metronic/helpers/AllCountry';
import Select from "react-select";

const BillingAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: "Ap #285-7193 Ullamcorper Avenue",
      city: "Amesbury",
      state: "HI",
      zip: "93373",
      country: "US",
      primary: false,
    },
    {
      id: 2,
      address: "1234 Elm Street",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      country: "US",
      primary: true,
    },
    {
      id: 3,
      address: "5678 Oak Avenue",
      city: "Oakland",
      state: "CA",
      zip: "94601",
      country: "US",
      primary: false,
    },
  ]);


  const sortObjectsByPrimary = (arr) => {
    return arr.sort((a, b) => {
      if (a.primary === true && b.primary === false) return -1; // a önce gelmeli
      if (a.primary === false && b.primary === true) return 1; // b önce gelmeli
      return 0; // Değerler eşit
    });
  };

  const makePrimary = (addressId) => {
  };

  const [showDeleteAdressModal, setShowDeleteAdressModal] = useState(false)
  const [showEditAddressModal, setShowEditAddressModal] = useState(false)
  const [selectedAdressIndex, setSelectedAdressIndex] = useState(null)

  const deleteAdress = () => {
    const _addresses = [...addresses]
    if (selectedAdressIndex !== null) {
      _addresses.splice(selectedAdressIndex, 1)
    }
    setAddresses([..._addresses])
  }

  return (
    <>
      {showDeleteAdressModal &&
        <CustomModal
          title="Delete Address"
          Content={() => (
            <p>Are you sure you want to delete the address?</p>
          )}
          setShowModal={setShowDeleteAdressModal}
          onPressSubmitButton={() => {
            deleteAdress()
          }}
          onPressCancelButton={() => {
            setShowDeleteAdressModal(false)
            setSelectedAdressIndex(null)
          }}
          submitBtnClassName="btn-danger"
          submitBtnTitle="Delete"
          cancelBtnTitle="Discard"
        />
      }
      {showEditAddressModal &&
        <CustomModal
          title="Edit Address"
          Content={() => (
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
                value={{ label: addresses[selectedAdressIndex || 0].country, key: addresses[selectedAdressIndex || 0].country }}
                className="form-control form-control-solid p-0"
              />
              <label className='fw-bold fs-6 mb-2 mt-4'>City</label>
              <input
                placeholder='City'
                type='text'
                value={addresses[selectedAdressIndex || 0].city}
                name='name'
                className={'form-control form-control-solid mb-3 mb-lg-0'}
                autoComplete='off'
              />
              <label className='fw-bold fs-6 mb-2 mt-4'>Zip Code</label>
              <input
                placeholder='Zip Code'
                type='text'
                name='name'
                value={addresses[selectedAdressIndex || 0].zip}
                className={'form-control form-control-solid mb-3 mb-lg-0'}
                autoComplete='off'
              />
              <label className='fw-bold fs-6 mb-2 mt-4'>Address</label>
              <input
                placeholder='Address'
                type='text'
                name='name'
                value={addresses[selectedAdressIndex || 0].address}
                className={'form-control form-control-solid mb-3 mb-lg-0'}
                autoComplete='off'

              />
            </div>
          )}
          setShowModal={setShowEditAddressModal}
          onPressSubmitButton={() => {

          }}
          onPressCancelButton={() => {
            setShowEditAddressModal(false)
            setSelectedAdressIndex(null)
          }}
          submitBtnClassName="btn-primary"
          submitBtnTitle="Edit"
          cancelBtnTitle="Discard"
        />
      }
      <div className="card mb-10">
        <div className="card-header card-header-stretch pb-0">
          <div className="card-title d-flex justify-content-between align-items-center w-100">
            <h3 className="m-0">Billing Address</h3>
            <a
              href="#"
              className="btn btn-primary px-6 py-2 align-self-center text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#AddBillingAddressModal"
            >
              Add Address{" "}
            </a>
          </div>
        </div>
        <div className="card-body p-9">
          <div className="row gx-9 gy-6">
            {sortObjectsByPrimary(addresses).map((address, index) => (
              <div
                className="col-xl-6"
                key={address.id}
                data-kt-billing-element="address"
              >
                <div className="card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6 position-relative">
                  <div
                    onClick={() => {
                      setShowEditAddressModal(true)
                      setSelectedAdressIndex(index)
                    }}
                    className="position-absolute end-0 top-0 mt-2 me-2 bg-gray-200 rounded px-2 py-1 btn btn-sm btn-light btn-active-light-primary"
                  >
                    <CiEdit className="fs-lg" />
                  </div>
                  <div className="d-flex flex-column py-2">
                    <div className="d-flex align-items-center fs-5 fw-bold mb-3">
                      Address {address.id}
                      {address.primary && (
                        <span className="badge badge-light-success fs-7 ms-2">
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="fs-6 fw-semibold text-gray-600">
                      {address.address}
                      <br />
                      {address.city} {address.state} {address.zip}
                      <br />
                      {address.country}
                    </div>
                  </div>

                  <div className="d-flex align-items-center py-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger btn-active-light-primary me-3"
                      onClick={(e) => {
                        e.preventDefault()
                        setShowDeleteAdressModal(true)
                        setSelectedAdressIndex(index)
                      }}
                    >
                      <span className="indicator-label">Delete</span>

                      <span className="indicator-progress">
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                    {address.primary == false && (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-light btn-active-light-primary"
                          onClick={() => makePrimary(address.id)}
                        >
                          Set Primary
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {addresses.length === 0 && (
              <div className="col-xl-6">
                <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed flex-stack h-xl-100 mb-10 p-6">
                  <div className="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                    <div className="mb-3 mb-md-0 fw-semibold">
                      <h4 className="text-gray-900 fw-bold">
                        Important Note!
                      </h4>
                    </div>

                    <a
                      href="#"
                      className="btn btn-primary px-6 align-self-center text-nowrap"
                      data-bs-toggle="modal"
                      data-bs-target="#AddBillingAddressModal"
                    >
                      New Address{" "}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


    </>
  );
};

export { BillingAddress };
