import axios from "axios"

export default axios.create({
    baseURL:'http://localhost:3999',
    headers: {
        'Content-Type': 'application/json',
      },
})