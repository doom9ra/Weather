import axios from 'axios'
const API_URL = 'http://localhost:8000'


export default class DateAPI {
    getDate(dataSetObj) {
        const url = `${API_URL}/api/weather/`
        return axios.get(url, {
            params: dataSetObj
        }).then(response => response.data)
    }
}