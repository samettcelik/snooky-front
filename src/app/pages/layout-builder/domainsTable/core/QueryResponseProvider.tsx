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
} from '../../../../../_metronic/helpers'
import { getDomains } from './_requests'
import { Domain } from './_models'
import { useQueryRequest } from './QueryRequestProvider'
// import { gql, useQuery } from '@apollo/client' // ============== New USE-QUERY use ==============

const QueryResponseContext = createResponseContext<Domain>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const [domainsData, setDomainsData] = useState()
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
    `${'/settings?tab=Website'}-${query}`,
    () => {
      return getDomains(query)
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
  // const GET_DOMAINS_QUERY = gql``;

  // const { loading: getDomainsLoading, error: getDomainsError, data: getDomainsData, refetch: getDomainsRefetch } = useQuery(GET_DOMAINS_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { GetDomains }: { GetDomains: any } = data
  //     setDomainsData(GetDomains.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !getDomainsLoading && !getDomainsError) {
  //       onCompleted(getDomainsData);
  //     } else if (onError && !getDomainsLoading && getDomainsError) {
  //       onError(getDomainsError);
  //     }
  //   }
  // }, [getDomainsLoading, getDomainsData, getDomainsError]);

  // return (
  //   <QueryResponseContext.Provider value={{ isLoading: getDomainsLoading, refetch: getDomainsRefetch, response: getDomainsData, query }}>
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
