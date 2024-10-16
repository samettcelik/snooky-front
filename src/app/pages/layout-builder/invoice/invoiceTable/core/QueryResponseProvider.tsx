/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from '../../../../../../_metronic/helpers'
import { getInvoices } from './_requests'
import { Invoice } from './_models'
import { useQueryRequest } from './QueryRequestProvider'
// import { gql, useQuery } from '@apollo/client' // ============== New USE-QUERY use ==============

const QueryResponseContext = createResponseContext<Invoice>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const [invoicesData, setInvoicesData] = useState()
  const { state } = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

  // ============== Old USE-QUERY use ==============
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.USERS_LIST}-${query}`,
    () => {
      return getInvoices(query)
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  )

  return (
    <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
      {children}
    </QueryResponseContext.Provider>
  )
  // ============== Old USE-QUERY use ==============



  // ============== New USE-QUERY use ==============
  // const GET_INVOICES_QUERY = gql``;

  // const { loading: getInvoicesLoading, error: getInvoicesError, data: getInvoicesData, refetch: getInvoicesRefetch } = useQuery(GET_INVOICES_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { GetInvoices }: { GetInvoices: any } = data
  //     setInvoicesData(GetInvoices.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !getInvoicesLoading && !getInvoicesError) {
  //       onCompleted(getInvoicesData);
  //     } else if (onError && !getInvoicesLoading && getInvoicesError) {
  //       onError(getInvoicesError);
  //     }
  //   }
  // }, [getInvoicesLoading, getInvoicesData, getInvoicesError]);

  // return (
  //   <QueryResponseContext.Provider value={{ isLoading: getInvoicesLoading, refetch: getInvoicesRefetch, response: getInvoicesData, query }}>
  //     {children}
  //   </QueryResponseContext.Provider>
  // )
  // ============== New USE-QUERY use ==============
}

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const { response } = useQueryResponse()
  if (!response) {
    return []
  }

  return response?.data || []
}

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  }

  const { response } = useQueryResponse()
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState
  }

  return response.payload.pagination
}

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse()
  return isLoading
}

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
}
