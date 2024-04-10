import urlJoin from '@common/helpers/url-join'
import axios, { AxiosInstance } from 'axios'

export default class baseApi {
  protected instance!: AxiosInstance
  protected prefix: string = ''

  public constructor(public baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // hook into axios instance
    this.instance.interceptors.request.use((request) => {
      request.headers['Content-Type'] = 'application/json'
      return request
    })

    // response
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        // check response;
        const { response } = error

        // check is server response data
        return Promise.reject(error)
      }
    )
  }

  protected getUrl(url: string) {
    return urlJoin(this.prefix, url)
  }

  // Requests
  protected Get<T = any>(url: string) {
    return this.instance.get<T>(this.getUrl(url))
  }

  protected Post<Payload = any, Response = any>(url: string, data?: Payload) {
    return this.instance.post<Response>(this.getUrl(url), data)
  }

  protected Put<Payload = any, Response = any>(url: string, data?: Payload) {
    return this.instance.put<Response>(this.getUrl(url), data)
  }

  protected Delete(url: string) {
    return this.instance.delete<Response>(this.getUrl(url))
  }

  public getInstance(): AxiosInstance {
    return this.instance
  }
}
