import React, { useEffect, useState } from "react";
import { KTIcon, isNotEmpty } from "../../../_metronic/helpers";
import * as Yup from 'yup'
import { useFormik } from "formik";
import clsx from "clsx";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CustomTooltip from "../../modules/customComponents/CustomTooltip";
import Select from "react-select";
import ct from 'countries-and-timezones'
import '../create-campaign/components/steps/components/custom.css'
import { Currencies, Languages, Timezones } from "../../Variable";

const AdvancedSettingsScreen = ({ }) => {
  const [loading, setLoading] = useState(false);
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);

  // Campaign Settings
  const [languages, setLanguages] = useState(Languages)
  const [selectedLanguage, setSelectedLanguage] = useState(Languages[37])

  const [selectedTimeZone, setSelectedTimeZone] = useState(Timezones[11])

  const [currencies, setCurrencies] = useState(Currencies)
  const [selectedCurrency, setSelectedCurrency] = useState(Currencies[140])
  const [supportedCurrencies, setSupportedCurrencies] = useState(null)

  const [selectedShowSettings, setSelectedShowSettings] = useState({ value: 'all', label: 'Desktop and Mobile' })

  // Google fomrs
  const [eventNoneInteraction, setEventNoneInteraction] = useState(false);
  const [eventPurchaseConfirmation, setEventPurchaseConfirmation] = useState(false);

  // Feed
  const [showDetail, setShowDetail] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [period, setPeriod] = useState(24);
  const [newDetail, setNewDetail] = useState(false);

  const [googleEvents] = useState({
    eventName: 'SNOOKY',
    eventCategory: 'Event Category',
    eventAction: 'Event Action',
    eventLabel: 'Event Label',
    eventValue: 'Event Value',
    eventNoneInteraction: false,
    eventPurchaseConfirmation: false
  })

  const [couponSecurity] = useState({
    couponNumber: 1,
    couponDays: 30,
    couponHours: 0,
    couponMinutes: 0,
  })

  const [productFeed] = useState({
    name: "",
    link: "",
    period: 24,
  })

  const productFeedSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Feed name is required'),
    link: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Feed link is required'),
    period: Yup.number()
      .required('Period is required'),
  })

  const editGoogleSchema = Yup.object().shape({
    eventName: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Event Name is required'),
    eventCategory: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Event Category is required'),
    eventAction: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Event Action is required'),
    eventLabel: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    eventValue: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
  })

  const couponSecuritySchema = Yup.object().shape({
    couponNumber: Yup.number()
      .required('Coupon Number is required'),
    couponDays: Yup.number()
      .required('Days is required'),
    couponHours: Yup.number()
      .required('Hours is required'),
    couponMinutes: Yup.number()
      .required('Minutes is required'),
  })

  const formik = useFormik({
    initialValues: googleEvents,
    validationSchema: editGoogleSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.eventName) && isNotEmpty(values.eventAction) && isNotEmpty(values.eventCategory)) {
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })

  const formik2 = useFormik({
    initialValues: couponSecurity,
    validationSchema: couponSecuritySchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.couponNumber) && isNotEmpty(values.couponDays) && isNotEmpty(values.couponMinutes) && isNotEmpty(values.couponHours)) {
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })

  const formik3 = useFormik({
    initialValues: productFeed,
    validationSchema: productFeedSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })

  return (
    <>
      <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
        <li className="nav-item">
          <a
            className="nav-link active text-gray-800"
            data-bs-toggle="tab"
            href="#campaign_settings_tab"
          >
            Campaign Settings
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-gray-800"
            data-bs-toggle="tab"
            href="#google_analytics_tab"
          >
            Google Analytics
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-gray-800"
            data-bs-toggle="tab"
            href="#coupon_security"
          >
            Coupon Security
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-gray-800"
            data-bs-toggle="tab"
            href="#product_feed"
          >
            Product Feed
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContentAdvancedSettings">
        <div
          className="tab-pane fade show active"
          id="campaign_settings_tab"
          role="tabpanel"
        >
          <div className="card mt-5">
            <div
              id="kt_account_deactivate_campaign_settings"
              className="collapse show"
            >
              <div
                id="kt_account_deactivate_form_campaign_settings"
                className="form"
              >
                <div className="card-header border-0">
                  <div className="card-title m-0 d-flex gap-2 w-100">
                    <h3 className="fw-bolder m-0">
                      Campaign Settings
                    </h3>
                  </div>
                </div>
                <div className="card-body p-9 card-body p-9 pt-4 border-top">
                  <div className="column">
                    <div className='fv-row mb-7 col-12 col-md-4 col-lg-3'>
                      <label className={`text-black fw-bold fs-6 mb-2`}>Default Campaign Language</label>
                      <Select
                        options={languages}
                        placeholder="Campaign Language"
                        className="p-0"
                        value={selectedLanguage}
                        onChange={(lang) => setSelectedLanguage(lang)}
                      />
                    </div>
                    <div className='fv-row mb-7 col-12 col-md-4 col-lg-3'>
                      <label className={`text-black fw-bold fs-6 mb-2`}>Default Currency</label>
                      <Select
                        options={currencies}
                        placeholder="Currency"
                        className="p-0"
                        value={selectedCurrency}
                        onChange={(currency) => setSelectedCurrency(currency)}
                      />
                    </div>
                    <div className='fv-row mb-7 col-12 col-md-4 col-lg-3'>
                      <label className={`text-black fw-bold fs-6 mb-2`}>Supported Currencies</label>
                      <Select
                        options={currencies}
                        isMulti
                        placeholder="Currency"
                        className="p-0"
                        value={supportedCurrencies}
                        onChange={(currency) => setSupportedCurrencies(currency)}
                      />
                    </div>
                    <div className='fv-row mb-7 col-12 col-md-4 col-lg-3'>
                      <label className={`text-black fw-bold fs-6 mb-2`}>Default Time Zone</label>
                      <Select
                        options={Timezones}
                        placeholder="Time Zone"
                        className="p-0"
                        value={selectedTimeZone}
                        onChange={(tz) => setSelectedTimeZone(tz)}
                      />
                    </div>
                    {/* <div className='fv-row mb-7 col-12 col-md-4 col-lg-3'>
                      <label className={`text-black fw-bold fs-6 mb-2`}>Show Desktop and/or Mobile</label>
                      <Select
                        options={[
                          { value: 'onlyDesktop', label: 'Only Desktop' },
                          { value: 'onlyMobile', label: 'Only Mobile' },
                          { value: 'all', label: 'Desktop and Mobile' }
                        ]}
                        placeholder="Show Desktop and/or Mobile"
                        className="p-0"
                        value={selectedShowSettings}
                        onChange={(show) => setSelectedShowSettings(show)}
                      />
                    </div> */}
                  </div>
                  <div className='text-center d-flex justify-content-end'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      data-kt-users-modal-action='submit'
                      disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
                      onClick={(e) => {
                        e.preventDefault()
                        formik.submitForm()
                      }}
                    >
                      <span className='indicator-label'>Save Changes</span>
                      {(formik.isSubmitting) && (
                        <span className='indicator-progress'>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade show"
          id="google_analytics_tab"
          role="tabpanel"
        >
          <div className="card mt-5">
            <div
              id="kt_account_deactivate_google_analytics"
              className="collapse show"
            >
              <div
                id="kt_account_deactivate_form_google_analytics"
                className="form"
              >
                <div className="card-header border-0">
                  <div className="card-title m-0 d-flex gap-2 w-100">
                    <h3 className="fw-bolder m-0">
                      Google Tag Manager Integration
                    </h3>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-user-websites">
                          <div className='d-flex flex-column'>
                            <span>You need to add macro names which are defined in your Google Tag Manager event tracker</span>
                          </div>
                        </Tooltip>
                      }
                    >
                      <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
                        <i className="bi bi-info-circle-fill"></i>
                      </span>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className="card-body p-9 card-body p-9 pt-4 border-top">
                  <div className="row mb-0">
                    <div className="col-lg-8 d-flex align-items-center mt-4">
                      <div className="form-check form-check-solid d-flex align-items-center gap-2">
                        <input
                          className="form-check-input w-18px h-18px"
                          type="checkbox"
                          id="allowmarketing"
                          defaultChecked={showGoogleForm}
                          onChange={(e) => setShowGoogleForm(e.target.checked)}
                        />
                        <label className="form-check-label text-gray-600" style={{ fontSize: '1.1rem' }}>Enable Google Tag Manager integration</label>
                      </div>
                    </div>
                  </div>
                  <form id='kt_google_analytics' className='form mt-10' onSubmit={formik.handleSubmit} noValidate>
                    <div
                      className='d-flex flex-column'
                      data-kt-scroll='true'
                      data-kt-scroll-activate='{default: false, lg: true}'
                      data-kt-scroll-max-height='auto'
                    >
                      <div className='fv-row mb-7 mx-2'>
                        <label className={`required ${showGoogleForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Event Name</label>
                        <input
                          placeholder='Event Name'
                          {...formik.getFieldProps('eventName')}
                          type='text'
                          name='eventName'
                          className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched.eventName && formik.errors.eventName },
                            { 'is-valid': formik.touched.eventName && !formik.errors.eventName }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || !showGoogleForm}
                        />
                        {formik.touched.eventName && formik.errors.eventName && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.eventName}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='fv-row mb-7 mx-2'>
                        <label className={`required ${showGoogleForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Event Category</label>
                        <input
                          placeholder='Event Category'
                          {...formik.getFieldProps('eventCategory')}
                          type='text'
                          name='eventCategory'
                          className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched.eventCategory && formik.errors.eventCategory },
                            { 'is-valid': formik.touched.eventCategory && !formik.errors.eventCategory }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || !showGoogleForm}
                        />
                        {formik.touched.eventCategory && formik.errors.eventCategory && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.eventCategory}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='fv-row mb-7 mx-2'>
                        <label className={`required ${showGoogleForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Event Action</label>
                        <input
                          placeholder='Event Action'
                          {...formik.getFieldProps('eventAction')}
                          type='text'
                          name='eventAction'
                          className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched.eventAction && formik.errors.eventAction },
                            { 'is-valid': formik.touched.eventAction && !formik.errors.eventeventAction }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || !showGoogleForm}
                        />
                        {formik.touched.eventAction && formik.errors.eventAction && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.eventAction}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='fv-row mb-7 mx-2'>
                        <label className={`${showGoogleForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Event Label</label>
                        <input
                          placeholder='Event Label'
                          {...formik.getFieldProps('eventLabel')}
                          type='text'
                          name='eventLabel'
                          className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched.eventLabel && formik.errors.eventLabel },
                            { 'is-valid': formik.touched.eventLabel && !formik.errors.eventLabel }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || !showGoogleForm}
                        />
                        {formik.touched.eventLabel && formik.errors.eventLabel && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.eventLabel}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='fv-row mb-7 mx-2'>
                        <label className={`${showGoogleForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Event Value</label>
                        <input
                          placeholder='Event Value'
                          {...formik.getFieldProps('eventValue')}
                          type='text'
                          name='eventValue'
                          className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched.eventValue && formik.errors.eventValue },
                            { 'is-valid': formik.touched.eventValue && !formik.errors.eventValue }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting || !showGoogleForm}
                        />
                        {formik.touched.eventValue && formik.errors.eventValue && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.eventValue}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 fs-lg mt-3">* Required fields for GTM Layer Integration</p>
                      <div className='text-center d-flex justify-content-end mt-'>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          data-kt-users-modal-action='submit'
                          disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
                          onClick={(e) => {
                            e.preventDefault()
                            formik.submitForm()
                          }}
                        >
                          <span className='indicator-label'>Save Changes</span>
                          {(formik.isSubmitting) && (
                            <span className='indicator-progress'>
                              Please wait...{' '}
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 card">
            <div className="card-header border-0">
              <div className="card-title m-0 d-flex gap-2 w-100">
                <h3 className="fw-bolder m-0">
                  Google Analytics Non-Interaction
                </h3>
                <CustomTooltip description="Send non-interactive session in Google Analytics to Snooky.io. It's recommended to switch this on to evaluate all users interactions." />
              </div>
            </div>
            <div className="card-body card-body p-9 pt-4 border-top">
              <div className='fv-row mx-2'>
                <label className={`text-black fw-bold fs-6 mb-2`}>
                  <span></span>
                </label>
                <div className="form-check form-check-solid d-flex align-items-center gap-2">
                  <input
                    className="form-check-input w-18px h-18px"
                    type="checkbox"
                    id="eventNoneInteraction"
                    disabled={formik.isSubmitting}
                    defaultChecked={eventNoneInteraction}
                    onChange={(e) => setEventNoneInteraction(e.target.checked)}
                  />
                  <label className="form-check-label text-gray-600" style={{ fontSize: '1.1rem' }}>Enable Google Analytics Non-Interaction</label>
                </div>
              </div>
              <div className='text-center d-flex justify-content-end'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  data-kt-users-modal-action='submit'
                  disabled={formik2.isSubmitting || !formik2.isValid || !formik2.touched}
                  onClick={(e) => {
                    e.preventDefault()
                    formik2.submitForm()
                  }}
                >
                  <span className='indicator-label'>Save Changes</span>
                  {(formik.isSubmitting) && (
                    <span className='indicator-progress'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 card">
            <div className="card-header border-0">
              <div className="card-title m-0 d-flex gap-2 w-100">
                <h3 className="fw-bolder m-0">
                  Purchase Confirmation Event
                </h3>
                <CustomTooltip description='After enabling this feature, you can track successful purchases unde the "ins-purchase-confirmation" event name.' />
              </div>
            </div>
            <div className="card-body card-body p-9 pt-4 border-top">
              <div className='fv-row mx-2'>
                <label className={`text-black fw-bold fs-6 mb-2`}>
                  <span></span>
                </label>
                <div className="form-check form-check-solid d-flex align-items-center gap-2">
                  <input
                    className="form-check-input w-18px h-18px"
                    type="checkbox"
                    id="eventPurchaseConfirmation"
                    disabled={formik.isSubmitting}
                    defaultChecked={eventPurchaseConfirmation}
                    onChange={(e) => setEventPurchaseConfirmation(e.target.checked)}
                  />
                  <label className="form-check-label text-gray-600" style={{ fontSize: '1.1rem' }}>Send an event to Google Analytics when a purchase is made</label>
                </div>
              </div>
              <div className='text-center d-flex justify-content-end'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  data-kt-users-modal-action='submit'
                  disabled={formik2.isSubmitting || !formik2.isValid || !formik2.touched}
                  onClick={(e) => {
                    e.preventDefault()
                    formik2.submitForm()
                  }}
                >
                  <span className='indicator-label'>Save Changes</span>
                  {(formik.isSubmitting) && (
                    <span className='indicator-progress'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='fv-row mx-2'>
              <label className={`text-black fw-bold fs-6 mb-2`}>Purchase Confirmation Event</label>
              <CustomTooltip description='After enabling this feature, you can track successful purchases unde the "ins-purchase-confirmation" event name.' />
              <div className="form-check form-check-solid d-flex align-items-center gap-2">
                <input
                  className="form-check-input w-18px h-18px"
                  type="checkbox"
                  id="eventPurchaseConfirmation"
                  disabled={formik.isSubmitting}
                  defaultChecked={eventPurchaseConfirmation}
                  onChange={(e) => setEventPurchaseConfirmation(e.target.checked)}
                />
                <label className="form-check-label text-gray-600" style={{ fontSize: '1.1rem' }}>Send an event to Google Analytics when a purchase is made</label>
              </div>
            </div> */}
        <div className="tab-pane fade" id="coupon_security" role="tabpanel">
          <div className="card mt-5">
            <div id="kt_account_deactivate_coupon_security" className="collapse show">
              <form id="kt_account_deactivate_form_coupon_security" className="form">
                <div className="card-header border-0">
                  <div className="card-title m-0 d-flex gap-2 w-100">
                    <h3 className="fw-bolder m-0">
                      Coupon Security
                    </h3>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-user-websites">
                          <div className='d-flex flex-column'>
                            <span>By enabling this option you are enabling our coupon security system. With this system you'll limit users to gain multiple coupon codes based on an IP adress.</span>
                          </div>
                        </Tooltip>
                      }
                    >
                      <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
                        <i className="bi bi-info-circle-fill"></i>
                      </span>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className="card-body p-9 pt-4 border-top">
                  <p className="text-gray-700 my-4 fs-lg">Please enter how many coupons you'd like to make users take per IP</p>
                  <div className="col-lg-8 d-flex align-items-center mt-4">
                    <div className="form-check form-check-solid d-flex align-items-center gap-2">
                      <input
                        className="form-check-input w-18px h-18px"
                        type="checkbox"
                        id="allowmarketing"
                        defaultChecked={showCouponForm}
                        onChange={(e) => setShowCouponForm(e.target.checked)}
                      />
                      <label className="form-check-label text-gray-600" style={{ fontSize: '1.1rem' }}>Enable coupon security</label>
                    </div>
                  </div>



                  <form id='kt_coupon_security' className='form mt-10' onSubmit={formik.handleSubmit} noValidate>
                    <div
                      className='d-flex flex-column'
                      data-kt-scroll='true'
                      data-kt-scroll-activate='{default: false, lg: true}'
                      data-kt-scroll-max-height='auto'
                    >
                      <div className="d-flex">

                        <div className='fv-row mb-7 mx-2'>
                          <label className={`${showCouponForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Number of coupons</label>
                          <input
                            placeholder='Number of coupons'
                            {...formik2.getFieldProps('couponNumber')}
                            type='number'
                            name='couponNumber'
                            onChange={(e) => {
                              if (e.target.value >= 0) {
                                formik2.handleChange(e);
                              }
                            }}
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik2.touched.couponNumber && formik2.errors.couponNumber },
                              { 'is-valid': formik2.touched.couponNumber && !formik2.errors.couponNumber }
                            )}
                            autoComplete='off'
                            disabled={formik2.isSubmitting || !showCouponForm}
                          />
                          {formik2.touched.couponNumber && formik2.errors.couponNumber && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik2.errors.couponNumber}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='fv-row mb-7 mx-2'>
                          <label className={`${showCouponForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Days</label>
                          <input
                            placeholder='Days'
                            {...formik2.getFieldProps('couponDays')}
                            type='number'
                            name='couponDays'
                            onChange={(e) => {
                              if (e.target.value >= 0) {
                                formik2.handleChange(e);
                              }
                            }}
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik2.touched.couponDays && formik2.errors.couponDays },
                              { 'is-valid': formik2.touched.couponDays && !formik2.errors.couponDays }
                            )}
                            autoComplete='off'
                            disabled={formik2.isSubmitting || !showCouponForm}
                          />
                          {formik2.touched.couponDays && formik2.errors.couponDays && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik2.errors.couponDays}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='fv-row mb-7 mx-2'>
                          <label className={`${showCouponForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Hours</label>
                          <input
                            placeholder='Hours'
                            {...formik2.getFieldProps('couponHours')}
                            type='number'
                            name='couponHours'
                            onChange={(e) => {
                              if (e.target.value >= 0) {
                                formik2.handleChange(e);
                              }
                            }}
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik2.touched.couponHours && formik2.errors.couponHours },
                              { 'is-valid': formik2.touched.couponHours && !formik2.errors.couponHours }
                            )}
                            autoComplete='off'
                            disabled={formik2.isSubmitting || !showCouponForm}
                          />
                          {formik2.touched.couponHours && formik2.errors.couponHours && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik2.errors.couponHours}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='fv-row mb-7 mx-2'>
                          <label className={`${showCouponForm ? 'text-black' : 'text-gray-600'} fw-bold fs-6 mb-2`}>Minutes</label>
                          <input
                            placeholder='Minutes'
                            {...formik2.getFieldProps('couponMinutes')}
                            type='number'
                            name='couponMinutes'
                            onChange={(e) => {
                              if (e.target.value >= 0) {
                                formik2.handleChange(e);
                              }
                            }}
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik2.touched.couponMinutes && formik2.errors.couponMinutes },
                              { 'is-valid': formik2.touched.couponMinutes && !formik2.errors.couponMinutes }
                            )}
                            autoComplete='off'
                            disabled={formik2.isSubmitting || !showCouponForm}
                          />
                          {formik2.touched.couponMinutes && formik2.errors.couponMinutes && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik2.errors.couponMinutes}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='text-center d-flex justify-content-end'>
                        <button
                          type='submit'
                          className='btn btn-primary'
                          data-kt-users-modal-action='submit'
                          disabled={formik2.isSubmitting || !formik2.isValid || !formik2.touched}
                          onClick={(e) => {
                            e.preventDefault()
                            formik2.submitForm()
                          }}
                        >
                          <span className='indicator-label'>Save Changes</span>
                          {(formik.isSubmitting) && (
                            <span className='indicator-progress'>
                              Please wait...{' '}
                              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="product_feed" role="tabpanel">
          <div className="card mt-5">
            <div id="kt_account_deactivate_product_feed" className="collapse show">
              <div className="card-header border-0">
                <div className="card-title m-0 d-flex gap-2 w-100">
                  <h3 className="fw-bolder m-0">
                    Upload Product Feed
                  </h3>
                </div>
              </div>
              <div className="card-body p-9 pt-4 border-top">
                <form id='kt_coupon_security' className='form' onSubmit={(e) => {
                  e.preventDefault()
                  formik3.handleSubmit()
                }} noValidate>
                  <div
                    className='d-flex flex-column'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                  >
                    <div className="d-flex flex-column">
                      <div className='fv-row mb-7 mx-2 col-12 col-md-4'>
                        <label className={`required text-black fw-bold fs-6 mb-2`}>Feed Name</label>
                        <input
                          placeholder='Feed Name'
                          {...formik3.getFieldProps('name')}
                          type='text'
                          name='name'
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched.name && formik.errors.name },
                            { 'is-valid': formik.touched.name && !formik.errors.name }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.name}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='fv-row mb-7 mx-2 col-12 col-md-4'>
                        <label className={`required text-black fw-bold fs-6 mb-2`}>Feed Link</label>
                        <input
                          placeholder='Feed Link'
                          {...formik3.getFieldProps('link')}
                          type='text'
                          onChange={(e) => setLink(e.target.value)}
                          value={link}
                          name='link'
                          className={clsx(
                            'form-control form-control-solid mb-3 mb-lg-0',
                            { 'is-invalid': formik.touched.link && formik.errors.link },
                            { 'is-valid': formik.touched.link && !formik.errors.link }
                          )}
                          autoComplete='off'
                          disabled={formik.isSubmitting}
                        />
                        {formik.touched.link && formik.errors.link && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.link}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='fv-row mb-7 mx-2 col-6'>
                        <label className={`required text-black fw-bold fs-6 mb-2`}>Refresh Period</label>
                        <div className="d-flex align-items-center gap-2">
                          <input
                            placeholder='Refresh Period'
                            {...formik3.getFieldProps('period')}
                            type='number'
                            name='period'
                            style={{
                              width: 100
                            }}
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik.touched.period && formik.errors.period },
                              { 'is-valid': formik.touched.period && !formik.errors.period }
                            )}
                            autoComplete='off'
                            value={period}
                            onChange={(e) => {
                              if (e.target.value > -1) {
                                setPeriod(e.target.value)
                                formik3.handleChange(e)
                              }
                            }}
                            disabled={formik.isSubmitting}
                          />
                          <span className="fs-4">h.</span>
                        </div>
                        {formik.touched.period && formik.errors.period && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                              <span role='alert'>{formik.errors.period}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="d-flex flex-end">
                        <button
                          type='submit'
                          className='btn btn-primary px-6 py-3 me-3'
                          onClick={(e) => {
                            e.preventDefault()
                            setNewDetail(true)
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="card mt-10">
            <div id="kt_account_deactivate_product_feed" className="collapse show">
              <div className="card-header border-0">
                <div className="card-title m-0 d-flex gap-2 w-100">
                  <h3 className="fw-bolder m-0">
                    Product Feed Information
                  </h3>
                </div>
              </div>
              <div className="card-body p-9 pt-5 border-top">
                <div className="border-bottom d-flex flex-column pb-7 mb-7">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="mb-0">
                        XML Feed Status
                      </h5>
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-user-websites">
                            <div className='d-flex flex-column'>
                              <span>Shows if there is an XML integration. You can trigger the feed by clicking Trigger XML Feed button.</span>
                            </div>
                          </Tooltip>
                        }
                      >
                        <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
                          <i className="bi bi-info-circle-fill"></i>
                        </span>
                      </OverlayTrigger>
                    </div>
                    <button
                      className='btn btn-primary px-6 py-3 me-3'
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      Trigger XML Feed
                    </button>
                  </div>
                  <span className="fs-5" style={{ marginTop: -15 }}>Enabled</span>
                </div>
                <div className="border-bottom d-flex flex-column pb-7 mb-7">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-2" >
                        <h5 className="mb-0">
                          XML Link
                        </h5>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-user-websites">
                              <div className='d-flex flex-column'>
                                <span>The link of the XML.</span>
                              </div>
                            </Tooltip>
                          }
                        >
                          <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
                            <i className="bi bi-info-circle-fill"></i>
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span className="fs-5 mt-2">
                        {newDetail ? link : 'https://storage.crwizard.com/175423cff950/e23d2441a86c/3bcfc4cc3b62_Segmentify.xml'}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-2">
                        <h5 className="mb-0">
                          Time Period
                        </h5>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-user-websites">
                              <div className='d-flex flex-column'>
                                <span>Shows the period of XML integration. For example if it is 2 days. It shows that every 2 days the integration is made.</span>
                              </div>
                            </Tooltip>
                          }
                        >
                          <span className="symbol-label rounded-circle text-inverse-primary fw-bolder">
                            <i className="bi bi-info-circle-fill"></i>
                          </span>
                        </OverlayTrigger>
                      </div>
                      <span className="fs-5 mt-2">Every {newDetail ? period : 24} hours</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="mb-0">
                        XML Feed Reading History
                      </h5>
                    </div>
                    <button
                      className='btn btn-primary fw-bolder px-6 py-3 me-3'
                      onClick={(e) => {
                        e.preventDefault()
                        setShowDetail(!showDetail)
                      }}
                    >
                      Details
                    </button>
                  </div>
                  <span className="fs-5" style={{ marginTop: -15 }}>Last Successfully Update Time 2024.01.03 13:40</span>
                  <div className="mt-6 fs-5 d-flex flex-column gap-1" style={{ height: showDetail ? 'auto' : 0, overflow: 'hidden', transition: '300ms all' }}>
                    <span>Reading Time: 2024-01-03 15:10 8350 product read. 5 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 15:07 8350 product read. 56 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 14:50 8350 product read. 0 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 14:36 8350 product read. 19 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 13:02 8350 product read. 80 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 11:05 8350 product read. 12 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 10:09 8350 product read. 5 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 09:45 8350 product read. 8 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 09:38 8350 product read. 43 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 09:29 8350 product read. 56 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 09:20 8350 product read. 50 product updated. Status OK</span>
                    <span>Reading Time: 2024-01-03 09:14 8350 product read. 12 product updated. Status OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedSettingsScreen;
