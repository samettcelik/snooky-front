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
  const [logsData, setLogsData] = useState()
  const { state } = useQueryRequest()
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

  // ============== Old USE-QUERY use ==============
  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery)
    }
  }, [updatedQuery])

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
  // const GET_LOGS_QUERY = gql``;

  // const { loading: getLogsLoading, error: getLogsError, data: getLogsData, refetch: getLogsRefetch } = useQuery(GET_LOGS_QUERY)

  // useEffect(() => {
  //   const onCompleted = (data: any) => {
  //     const { GetLogs }: { GetLogs: any } = data
  //     setLogsData(GetLogs.map((item) => ({ label: item.name, value: item.id })))
  //   };
  //   const onError = (error: any) => {
  //     console.log(error);
  //   };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !getLogsLoading && !getLogsError) {
  //       onCompleted(getLogsData);
  //     } else if (onError && !getLogsLoading && getLogsError) {
  //       onError(getLogsError);
  //     }
  //   }
  // }, [getLogsLoading, getLogsData, getLogsError]);

  // return (
  //   <QueryResponseContext.Provider value={{ isLoading: getLogsLoading, refetch: getLogsRefetch, response: getLogsData, query }}>
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
