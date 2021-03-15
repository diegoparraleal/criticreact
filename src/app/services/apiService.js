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
        const response = await axios.get(`${SERVER_URL}/users/byEmail/${email}`)
        return response.data
    },

    async loadRestaurants(rating, name, page, ownerId){
        const params = {
            rating: rating || null,
            name: name || null,
            page: page || null,
            ownerId: ownerId || null,
        }
        const response = await axios.get(`${SERVER_URL}/restaurants`, { params})
        return response.data
    },
    
}