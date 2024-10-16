import { useQuery } from 'react-query'
import { DomainEditModalForm } from './DomainEditModalForm'
import { isNotEmpty, QUERIES } from '../../../../../_metronic/helpers'
import { useListView } from '../core/ListViewProvider'
import { getDomainById } from '../core/_requests'
// import { gql, useQuery } from '@apollo/client' // ============== New USE-QUERY use ==============
import { useEffect, useState } from 'react'

const DomainEditModalFormWrapper = () => {
  const [domainData, setDomainData] = useState()
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
      return getDomainById(itemIdForUpdate)
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
    return <DomainEditModalForm isDomainLoading={isLoading} user={{ id: undefined }} />
  }

  if (!isLoading && !error && user) {
    return <DomainEditModalForm isDomainLoading={isLoading} user={user} />
  }
  // ============== Old USE-QUERY use ==============



  // ============== New USE-QUERY use ==============
  // const UPDATE_DOMAIN_QUERY = gql``;

  // const { loading: updateDomainLoading, error: updateDomainError, data: updateDomainData } = useQuery(UPDATE_DOMAIN_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { UpdateDomain }: { UpdateDomain: any } = data
  //     setDomainData(UpdateDomain.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !updateDomainLoading && !updateDomainError) {
  //       onCompleted(updateDomainData);
  //     } else if (onError && !updateDomainLoading && updateDomainError) {
  //       onError(updateDomainError);
  //     }
  //   }
  // }, [updateDomainLoading, updateDomainData, updateDomainError]);


  // if (!itemIdForUpdate) {
  //   return <DomainEditModalForm isDomainLoading={updateDomainLoading} user={{ id: undefined }} />
  // }

  // if (!updateDomainLoading && !updateDomainError && updateDomainData) {
  //   return <DomainEditModalForm isDomainLoading={updateDomainLoading} user={updateDomainData} />
  // }
  // ============== New USE-QUERY use ==============

  return null
}

export { DomainEditModalFormWrapper }
