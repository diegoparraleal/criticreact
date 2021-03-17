import axios from "axios";
import {SERVER_URL} from "../../env"

export const ROLES = {
    NONE: "none",
    USER: "user",
    OWNER: "owner",
    ADMIN: "admin"
}

export const apiService = { 
    
    async createAppUser(appUser){
        return await axios.post(`${SERVER_URL}/users/`, appUser)
    },

    async loadAppUserByEmail(email) {
        const response = await axios.get(`${SERVER_URL}/users/byEmail/${email}`)
        return response.data
    },

    async loadUsers(name){
        const params = {
            name: name || null,
        }
        const response = await axios.get(`${SERVER_URL}/users`, { params})
        return response.data
    },

    async editUser(user) {
        return await axios.put(`${SERVER_URL}/users/${user.id}`, user);
    },

    async deleteUser(userId) {
        return await axios.delete(`${SERVER_URL}/users/${userId}`);
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

    async loadRestaurant(restaurantId){
        const response = await axios.get(`${SERVER_URL}/restaurants/${restaurantId}`)
        return response.data
    },

    async loadRestaurantReviews(restaurantId, page){
        const params = {
            page: page || null,
        }
        const response = await axios.get(`${SERVER_URL}/restaurants/${restaurantId}/reviews`, {params})
        return response.data
    },

    async postReview(restaurantId, review){
        return await axios.post(`${SERVER_URL}/restaurants/${restaurantId}/reviews`, review)
    },

    async deleteReview(restaurantId, reviewId){
        return await axios.delete(`${SERVER_URL}/restaurants/${restaurantId}/reviews/${reviewId}`)
    },

    async editReview(restaurantId, reviewId, review){
        return await axios.put(`${SERVER_URL}/restaurants/${restaurantId}/reviews/${reviewId}`, review)
    },

    async loadPendingReviews(ownerId){
        const params = {
            ownerId: ownerId || null,
        }
        const response = await axios.get(`${SERVER_URL}/reviews/pending`, {params})
        return response.data
    },

    async postReply(restaurantId, reviewId, reply){
        return await axios.post(`${SERVER_URL}/restaurants/${restaurantId}/reviews/${reviewId}/reply`, reply)
    },
    
    async addRestaurant(restaurant) {
        return await axios.post(`${SERVER_URL}/restaurants`, restaurant);
    },

    async editRestaurant(restaurant) {
        return await axios.put(`${SERVER_URL}/restaurants/${restaurant.id}`, restaurant);
    },

    async deleteRestaurant(restaurantId) {
        return await axios.delete(`${SERVER_URL}/restaurants/${restaurantId}`);
    },
    
}