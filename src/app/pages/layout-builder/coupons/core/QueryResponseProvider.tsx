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
import { getCoupons } from './_requests'
import { Domain } from './_models'
import { useQueryRequest } from './QueryRequestProvider'
// import { gql, useQuery } from '@apollo/client'  // ============== New USE-QUERY use ==============

const QueryResponseContext = createResponseContext<Domain>(initialQueryResponse)
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const [couponsData, setCouponsData] = useState()
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
      return getCoupons(query)
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

  // const GET_COUPONS_QUERY = gql``;

  // const { loading: getCouponsLoading, error: getCouponsError, data: getCouponsData, refetch: getCouponsRefetch } = useQuery(GET_COUPONS_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { GetCoupons }: { GetCoupons: any } = data
  //     setCouponsData(GetCoupons.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !getCouponsLoading && !getCouponsError) {
  //       onCompleted(getCouponsData);
  //     } else if (onError && !getCouponsLoading && getCouponsError) {
  //       onError(getCouponsError);
  //     }
  //   }
  // }, [getCouponsLoading, getCouponsData, getCouponsError]);

  // return (
  //   <QueryResponseContext.Provider value={{ isLoading: getCouponsLoading, refetch: getCouponsRefetch, response: getCouponsData, query }}>
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
