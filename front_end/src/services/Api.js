// SETTING KIND OF CONNECTOR (FRONT END - BACK END)

// CREATE AN AXIOS OBJECTS THAT POINTS TO A CERTAIN URL

import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: `http://localhost:3000/`
    })
}