import axios, { AxiosResponse } from 'axios'
import { ID, Response } from '../../../../../_metronic/helpers'
import { Domain, DomainsQueryResponse } from './_models'
import { SnookyClient } from '../../../../modules/Request'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `${API_URL}/users/query`

const getCoupons = async (query: string): Promise<DomainsQueryResponse> => {
  let params = JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

  const newData = await SnookyClient.GetCoupons({ ...params })
  const _data: any = {
    data: newData.data,
    payload: {
      pagination: {
        // TODO: Verilerin hepsi newData içerisinde var sadece domaine bağlanması gerekiyor
        firs_page_url: '/?page=1',
        from: newData.to,
        items_per_page: newData.per_page,
        last_page: newData.last_page,
        next_page_url: '/?page=1',
        page: newData.current_page,
        prev_page_url: null,
        to: newData.to,
        total: newData.data.length
      }
    }
  }
  return _data
  // return axios
  //   .get(`${GET_USERS_URL}?${query}`)
  //   .then((d: AxiosResponse<DomainsQueryResponse>) => d.data)
}

const getDomainById = (id: ID): Promise<Domain | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Domain>>) => response.data)
    .then((response: Response<Domain>) => response.data)
}

const createDomain = (user: Domain): Promise<Domain | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<Domain>>) => response.data)
    .then((response: Response<Domain>) => response.data)
}

const updateDomain = (user: Domain): Promise<Domain | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<Domain>>) => response.data)
    .then((response: Response<Domain>) => response.data)
}

const deleteDomain = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => { })
}

const deleteSelectedDomains = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => { })
}

export { getCoupons, deleteDomain, deleteSelectedDomains, getDomainById, createDomain, updateDomain }
