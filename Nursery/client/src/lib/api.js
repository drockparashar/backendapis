// lib/api.js
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "https://backend-apis-00fo.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Plant API helpers
export const getAllPlants = async () => {
  try {
    const response = await api.get("/plant/all");
    // Ensure the response contains the `plants` property
    if (response.data && Array.isArray(response.data.plants)) {
      return response.data.plants;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch plants");
  }
};

export const getPlantById = async (id) => {
  try {
    const response = await api.get(`/plant/${id}`);
    return response.data.plant; // Backend returns `plant` in the response
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch plant details"
    );
  }
};

export const createPlant = async (species) => {
  try {
    const response = await api.post("/plant", { species });
    return response.data.new_plant; // Backend returns `new_plant` in the response
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create plant");
  }
};

export const waterPlant = async (id) => {
  try {
    const response = await api.patch(`/plant/${id}/water`);
    return response.data.getPlant; // Backend returns `getPlant` in the response
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to water plant");
  }
};

export const fertilizePlant = async (id) => {
  try {
    const response = await api.patch(`/plant/${id}/fertilize`);
    return response.data.plant; // Backend returns `plant` in the response
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fertilize plant"
    );
  }
};

export const harvestPlant = async (id) => {
  try {
    const response = await api.patch(`/plant/${id}/harvest`);
    return response.data.plant; // Backend returns `plant` in the response
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to harvest plant");
  }
};

export default api;
