import { useState } from 'react'
import { KTIcon, isNotEmpty } from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { DomainsListFilter } from './DomainsListFilter'
import { CustomModal } from '../../../../../modules/customComponents/CustomModal'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { createDomain } from '../../core/_requests'
import { toast } from 'react-toastify'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { SnookyClient } from '../../../../../modules/Request'
import { domainAtom } from '../../../../../../store/jotai/DomainAtom'
import { useAtom } from 'jotai'

const DomainsListToolbar = () => {
  const [domainsStore, setDomains] = useAtom(domainAtom)
  const [showAddModal, setShowAddModal] = useState(false)
  const { setItemIdForUpdate } = useListView()
  const urlRegex = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  const addDomainSchema = Yup.object().shape({
    url: Yup.string()
      .matches(urlRegex, 'Please enter a valid url')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('URL is required'),
  })


  const { refetch } = useQueryResponse()

  const formik = useFormik({
    initialValues: { url: 'https://' },
    validationSchema: addDomainSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.url)) {
          const data: any = await createDomain(values.url)
          if (data.message) {
            toast.success(data.message)
            setShowAddModal(false)
            const domains = await SnookyClient.GetDomains()
            if (domains.data.length > 0) {
              setDomains({
                ...domainsStore,
                domains: domains.data
              })
            }
          }
        }
      } catch (ex: any) {
        toast.error(ex.response.data.message)
      } finally {
        setSubmitting(true)
        setShowAddModal(false)
        setTimeout(() => {
          refetch()
        }, 1000)
      }
    },
  })

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {showAddModal && (
        <CustomModal
          title='Add Domain'
          Content={() => (
            <form className='form' onSubmit={formik.handleSubmit} noValidate>
              <input
                placeholder='Domain URL'
                {...formik.getFieldProps('url')}
                type='text'
                name='url'
                className={clsx(
                  'form-control form-control-solid mx-1 mb-3 mb-lg-0',
                  { 'is-invalid': formik.touched.url && formik.errors.url },
                  {
                    'is-valid': formik.touched.url && !formik.errors.url,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting}
              />
              {formik.touched.url && formik.errors.url && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.url}</span>
                  </div>
                </div>
              )}
            </form>
          )}
          setShowModal={setShowAddModal}
          cancelBtnTitle='Cancel'
          submitBtnClassName='btn-primary'
          submitBtnTitle='Add Domain'
          onPressSubmitButton={() => {
            formik.handleSubmit()
          }}
        />
      )}
      <DomainsListFilter />



      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={() => { setShowAddModal(true) }}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Domain
      </button>
      {/* end::Add user */}
    </div>
  )
}

export { DomainsListToolbar }
