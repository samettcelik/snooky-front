/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IUpdateEmail, IUpdatePassword, updateEmail, updatePassword } from './SettingsModel'
import { useAuth } from '../../../modules/auth'
import { useAtom } from 'jotai'
import { userAtom } from '../../../../store/jotai/UserAtom'

const emailFormValidationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  confirmPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
})

const SignInMethod: React.FC = () => {
  const [currentUser, setCurrentUser] = useAtom(userAtom)
  const [emailUpdateData, setEmailUpdateData] = useState<IUpdateEmail>(updateEmail)
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)

  const [showEmailForm, setShowEmailForm] = useState<boolean>(false)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)

  const [loading1, setLoading1] = useState(false)

  // NEW AUTH
  // const { currentUser } = useAuth()
  
  const formik1 = useFormik<IUpdateEmail>({
    initialValues: {
      newEmail: currentUser?.email || '',
      confirmPassword: '',
    },
    validationSchema: emailFormValidationSchema,
    onSubmit: (values) => {
      setLoading1(true)
      setTimeout((values) => {
        setEmailUpdateData(values)
        setLoading1(false)
        setShowEmailForm(false)
      }, 1000)
    },
  })

  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: (values) => {
      setLoading2(true)
      setTimeout((values) => {
        setPasswordUpdateData(values)
        setLoading2(false)
        setPasswordForm(false)
      }, 1000)
    },
  })

  if (!currentUser.name) return null
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Sign-in Method</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='d-flex flex-wrap align-items-center'>

            {/* Hep açık geldiği için gerek kalmadı */}
            <div id='kt_signin_email' className={' ' + (showEmailForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Email Address</div>
              <div className='fw-bold text-gray-600'>{currentUser.email}</div>
            </div>

            {/* Hep açık gelmesi için true yapıldı normalde showEmailForm */}
            {showEmailForm && (
              <div
                id='kt_signin_email_edit'
                className={'flex-row-fluid '}
              >
                <form
                  onSubmit={formik1.handleSubmit}
                  id='kt_signin_change_email'
                  className='form'
                  noValidate
                >
                  <div className='row mb-6'>
                    <div className='col-lg-6 mb-4 mb-lg-0'>
                      <div className='fv-row mb-0'>
                        <label htmlFor='emailaddress' className='form-label fs-6 fw-bolder mb-3'>
                          Enter New Email Address
                        </label>
                        <input
                          type='email'
                          className='form-control form-control-lg form-control-solid'
                          id='emailaddress'
                          placeholder='Email Address'
                          {...formik1.getFieldProps('newEmail')}
                        />
                        {formik1.touched.newEmail && formik1.errors.newEmail && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>{formik1.errors.newEmail}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className='col-lg-6'>
                      <div className='fv-row mb-0'>
                        <label
                          htmlFor='confirmemailpassword'
                          className='form-label fs-6 fw-bolder mb-3'
                        >
                          Confirm Password
                        </label>
                        <input
                          type='password'
                          className='form-control form-control-lg form-control-solid'
                          id='confirmemailpassword'
                          {...formik1.getFieldProps('confirmPassword')}
                        />
                        {formik1.touched.confirmPassword && formik1.errors.confirmPassword && (
                          <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>{formik1.errors.confirmPassword}</div>
                          </div>
                        )}
                      </div>
                    </div> */}
                  </div>
                  <div className='d-flex'>
                    <button
                      id='kt_signin_submit'
                      type='submit'
                      className='btn btn-primary  me-2 px-6'
                    >
                      {!loading1 && 'Update Email'}
                      {loading1 && (
                        <span className='indicator-progress' style={{ display: 'block' }}>
                          Please wait...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                    <button
                      id='kt_signin_cancel'
                      type='button'
                      onClick={() => {
                        setShowEmailForm(false)
                      }}
                      className='btn btn-color-gray-400 btn-active-light-primary px-6'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div id='kt_signin_email_button' className={'ms-auto ' + (showEmailForm && 'd-none')}>
              <div
                onClick={() => {
                  setShowEmailForm(true)
                }}
                className='btn btn btn-primary'
              >
                Change Email
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SignInMethod }
