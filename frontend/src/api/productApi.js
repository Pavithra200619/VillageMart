import axios from "axios";

const API = "https://villagemart-tu66.onrender.com/api/products";

export const getProducts = async () => {
    const response = await axios.get(API);
    return response.data;
};