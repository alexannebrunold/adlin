import axios from "axios"

class HttpService {
  constructor(headers) {
    this.apiUrl = "http://localhost:8000/api"
    this.headers = {
      headers,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  }

  get({ path }) {
    return axios
      .get({
        baseURL: this.apiUrl + path,
        headers: this.headers,
      })
      .then((result) => {
        return result.data
      })
      .catch((error) => {
        throw error
      })
  }

  post({ path, body }) {
    return axios
      .post(this.apiUrl + path, body, {
        headers: this.headers,
      })
      .then((result) => {
        return result.data
      })
      .catch((error) => {
        throw error
      })
  }
}

const httpService = new HttpService()

export default httpService
