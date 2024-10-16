/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { MenuComponent } from '../../../../../../_metronic/assets/ts/components'
import { ID, KTIcon, QUERIES } from '../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deleteUser, getUserById } from '../../core/_requests'
import { DeleteModal } from '../../components/modals/DeleteModal'

type Props = {
  id: ID,
  email: string
}

const UserActionsCell: FC<Props> = ({ id, email }) => {
  const { setItemIdForUpdate } = useListView()
  const { query } = useQueryResponse()
  const queryClient = useQueryClient()
  const [user, setUser] = useState<any>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = async () => {
    try {
      const userData = await getUserById(id);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error(error);
    }

    setItemIdForUpdate(id);
  };

  return (
    <div className='d-flex justify-content-center'>
      {showDeleteModal && <DeleteModal setShowModal={setShowDeleteModal} id={id} email={email} />}
      <a
        href='#'
        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='dots-horizontal' className='fs-2 m-0' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        {/* EDİTLENECEK Eğer daveti kabul edip içeri girmediyse tekrar mail gönderilecek */}
        <div className='menu-item px-3'>
          <a className='menu-link px-3'>
            Resend
          </a>
        </div>
        {/* end::Menu item */}
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {/* EDİTLENECEK Role ile kontrol edilmeli ve sadece owner bu butonu gözükecek */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </div>
  )
}

export { UserActionsCell }
