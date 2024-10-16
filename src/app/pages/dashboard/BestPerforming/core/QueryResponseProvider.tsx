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
  const [bestPerformingData, setBestPerformingData] = useState()
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
  // const GET_BESTPERFORMING_QUERY = gql``;

  // const { loading: getBestPerformingLoading, error: getBestPerformingError, data: getBestPerformingData, refetch: getBestPerformingRefetch } = useQuery(GET_BESTPERFORMING_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { GetBestPerforming }: { GetBestPerforming: any } = data
  //     setBestPerformingData(GetBestPerforming.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !getBestPerformingLoading && !getBestPerformingError) {
  //       onCompleted(getBestPerformingData);
  //     } else if (onError && !getBestPerformingLoading && getBestPerformingError) {
  //       onError(getBestPerformingError);
  //     }
  //   }
  // }, [getBestPerformingLoading, getBestPerformingData, getBestPerformingError]);

  // return (
  //   <QueryResponseContext.Provider value={{ isLoading: getBestPerformingLoading, refetch: getBestPerformingRefetch, response: bestPerformingData, query }}>
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
