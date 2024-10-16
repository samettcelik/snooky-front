import { useQuery } from 'react-query'
import { PopupEditModalForm } from './PopupEditModalForm'
import { isNotEmpty, QUERIES } from '../../../../../_metronic/helpers'
import { useListView } from '../core/ListViewProvider'
import { getPopupById } from '../core/_requests'
// import { gql, useQuery } from '@apollo/client' // ============== New USE-QUERY use ==============
import { useEffect, useState } from 'react'

const PopupEditModalFormWrapper = () => {
  const [updatedPopupData, setUpdatedPopupData] = useState()
  const { itemIdForUpdate, setItemIdForUpdate } = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)

  // ============== Old USE-QUERY use ==============
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getPopupById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <PopupEditModalForm isPopupLoading={isLoading} user={{ id: undefined }} />
  }

  if (!isLoading && !error && user) {
    return <PopupEditModalForm isPopupLoading={isLoading} user={user} />
  }
  // ============== Old USE-QUERY use ==============



  // ============== New USE-QUERY use ==============
  // const UPDATE_POPUP_QUERY = gql``;

  // const { loading: updatePopupLoading, error: updatePopupError, data: updatePopupData } = useQuery(UPDATE_POPUP_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { UpdatePopup }: { UpdatePopup: any } = data
  //     setUpdatedPopupData(UpdatePopup.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !updatePopupLoading && !updatePopupError) {
  //       onCompleted(updatePopupData);
  //     } else if (onError && !updatePopupLoading && updatePopupError) {
  //       onError(updatePopupError);
  //     }
  //   }
  // }, [updatePopupLoading, updatePopupData, updatePopupError]);

  // if (!itemIdForUpdate) {
  //   return <PopupEditModalForm isPopupLoading={updatePopupLoading} user={{ id: undefined }} />
  // }

  // if (!updatePopupLoading && !updatePopupError && updatePopupData) {
  //   return <PopupEditModalForm isPopupLoading={updatePopupLoading} user={updatePopupData} />
  // }

  // ============== New USE-QUERY use ==============

  return null
}

export { PopupEditModalFormWrapper }
