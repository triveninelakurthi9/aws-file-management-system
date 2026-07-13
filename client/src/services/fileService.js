import api from "./api";

export const getFiles = async () => {
    const response = await api.get("/files");
    return response.data;
};

export const getStorage = async () => {
    const response = await api.get("/files/storage");
    return response.data;
};
export const searchFiles = async (query) => {
    const response = await api.get(`/files/search?query=${query}`);
    return response.data;
};
