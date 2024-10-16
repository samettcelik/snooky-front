/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { ID, KTIcon, QUERIES } from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deleteDomain } from '../../core/_requests'
import { Link } from "react-router-dom";
import { DeleteModal } from '../../components/modals/DeleteModal'
import { DeactivateModal } from '../../components/modals/DeactivateModal'
import { CustomModal } from '../../../../../modules/customComponents/CustomModal'
import { SnookyClient } from '../../../../../modules/Request'
import { toast } from 'react-toastify'

type Props = {
  id: number,
  domain: string
}

const DomainActionsCell: FC<Props> = ({ id, domain }) => {
  const { setItemIdForUpdate } = useListView()
  const { query } = useQueryResponse()
  const queryClient = useQueryClient()
  const [newDomain, setNewDomain] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState<boolean>(false)

  const { refetch } = useQueryResponse()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  useEffect(() => {
    setNewDomain(domain)
  }, [domain])

  return (
    <div className='d-flex justify-content-center'>
      {showEditModal && <CustomModal
        title='Edit Website'
        Content={() => {
          return (
            <div>
              <input
                placeholder='Domain URL'
                type='text'
                name='url'
                className={'form-control form-control-solid mx-1 mb-3 mb-lg-0'}
                autoComplete='off'
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
              {error && <span className='text-danger'>{error}</span>}
            </div >
          )
        }}
        setShowModal={setShowEditModal}
        submitBtnClassName='btn-primary'
        cancelBtnTitle='Discard'
        submitBtnTitle='Edit'
        onPressSubmitButton={async () => {
          if (newDomain.length < 6) {
            return setError('Min 6 symbol.')
          }
          const data = await SnookyClient.UpdateDomain({ id, url: newDomain })
          if (data?.message) {
            toast.success(data.message)
          }
          refetch()
          setShowEditModal(false)
        }}
      />}
      {showDeleteModal && <DeleteModal setShowModal={setShowDeleteModal} domain={domain} id={id} />}
      {showDeactivateModal && <DeactivateModal setShowModal={setShowDeactivateModal} domain={domain} id={id} />}
      <a
        href='#'
        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='dots-horizontal' className='fs-2 m-0' />
      </a>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        <div className='menu-item px-3'>
          <Link className='menu-link' to='/settings?tab=Install'>
            Install
          </Link>
        </div>
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => {
              setShowEditModal(true)
            }}
          >
            Edit URL
          </a>
        </div>
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => setShowDeactivateModal(true)}
          >
            Deactivate
          </a>
        </div>
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  )
}

export { DomainActionsCell }
