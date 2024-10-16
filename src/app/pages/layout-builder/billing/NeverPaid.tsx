import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CancelModal } from './CancelModal'

const NeverPaid = () => {

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false)

  return (
    <>
      {showCancelModal && <CancelModal setShowModal={setShowCancelModal} />}
      <div className='card  mb-10 card-body p-9'>
        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed mb-12 p-6'>
          <i className='ki-duotone ki-information fs-2tx text-warning me-4'>
            <span className='path1'></span>
            <span className='path2'></span>
            <span className='path3'></span>
          </i>

          <div className='d-flex flex-stack flex-grow-1 '>
            <div className='d-flex flex-row justify-content-between align-items-start w-100 gap-3 flex-wrap'>
              <div className='fw-semibold'>
                <h4 className='text-gray-900 fw-bold'>We need your attention!</h4>
                <div className='fs-6 text-gray-700'>
                  <p className='d-flex gap-1 flex-wrap'>
                    Your payment was declined. To start using tools, please{' '}
                    <a
                      href='#'
                      className='fw-bold'
                      data-bs-toggle="modal"
                      data-bs-target="#AddPaymentCardModal"
                    >
                      Add Payment Method.
                    </a>
                  </p>
                </div>
              </div>
              <button className="btn btn-warning">Pay Again</button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-7'>
            <h3 className='mb-2'>Active until Dec 09, 2023</h3>
            <p className='fs-6 text-gray-600 fw-semibold mb-6 mb-lg-15'>
              We will send you a notification upon Subscription expiration{' '}
            </p>

            <div className='fs-5 mb-2'>
              <span className='text-gray-800 fw-bold me-1'>$24.99</span>
              <span className='text-gray-600 fw-semibold'>Per Month</span>
            </div>

            <div className='fs-6 text-gray-600 fw-semibold'>
              Basic package // 50.000 pageviews monthly
            </div>
          </div>

          <div className='col-lg-5'>
            <div className='d-flex text-muted fw-bold fs-5 mb-3'>
              <span className='flex-grow-1 text-gray-800'>Pageviews</span>
              <span className='text-gray-800'>30.000 of 50.000</span>
            </div>


            <div className="progress h-8px bg-light-primary mb-2">
              <div className="progress-bar" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}></div>
            </div>

            <div className='fs-6 text-gray-600 fw-semibold mb-10'>
              20.000 Pageviews remaining until your plan requires update
            </div>

            <div className='d-flex justify-content-end pb-0 px-0'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowCancelModal(true)
                }}
                className='btn btn-light btn-active-light-primary me-2'
                id='kt_account_billing_cancel_subscription_btn'
              >
                Cancel Subscription
              </button>
              <Link
                className='btn btn-primary'
                to='/settings?tab=pricing'
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { NeverPaid }
