import { API_URL_BASE } from './config'
import queryString from 'query-string'

export function get(path, queryParams) {
    const query = queryString.stringify(queryParams)
    return fetch(`${API_URL_BASE}(${path})?(${query})`)
}