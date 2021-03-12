import axios from "axios";
import {SERVER_URL} from "../../env"

export const ROLES = {
    NONE: "none",
    USER: "user",
    OWNER: "owner",
    ADMIN: "admin"
}

export const apiService = { 
    
    createAppUser: (appUser) => {
        return axios.post(`${SERVER_URL}/users/`, appUser)
    },

    async loadAppUserByEmail(email) {
        var response = await axios.get(`${SERVER_URL}/users/byEmail/${email}`)
        return response.data
    }
    
}