import { useQuery } from 'react-query'
import { UserEditModalForm } from './UserEditModalForm'
import { isNotEmpty, QUERIES } from '../../../../../_metronic/helpers'
import { useListView } from '../core/ListViewProvider'
import { getUserById } from '../core/_requests'
// import { gql, useQuery } from '@apollo/client' // ============== New USE-QUERY use ==============
import { useEffect, useState } from 'react'

const UserEditModalFormWrapper = () => {
  const [userData, setUserData] = useState()
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
      return getUserById(itemIdForUpdate)
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
    return <UserEditModalForm isUserLoading={isLoading} user={{ id: undefined }} />
  }

  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user} />
  }
  // ============== Old USE-QUERY use ==============


  // ============== New USE-QUERY use ==============
  // const UPDATE_USER_QUERY = gql``;

  // const { loading: updateUserLoading, error: updateUserError, data: updateUserData } = useQuery(UPDATE_USER_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { UpdateUser }: { UpdateUser: any } = data
  //     setUserData(UpdateUser.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !updateUserLoading && !updateUserError) {
  //       onCompleted(updateUserData);
  //     } else if (onError && !updateUserLoading && updateUserError) {
  //       onError(updateUserError);
  //     }
  //   }
  // }, [updateUserLoading, updateUserData, updateUserError]);

  // if (!itemIdForUpdate) {
  //   return <UserEditModalForm isUserLoading={updateUserLoading} user={{ id: undefined }} />
  // }

  // if (!updateUserLoading && !updateUserError && updateUserData) {
  //   return <UserEditModalForm isUserLoading={updateUserLoading} user={updateUserData} />
  // }
  // ============== New USE-QUERY use ==============

  return null
}

export { UserEditModalFormWrapper }
