import { axiosClient } from "./axios";


export const getData = (url: any) => {
    return axiosClient.get(url);
}

export const postData = (url: any, body: any) => {
    return axiosClient.post(url, body);
}

export const updateData = (url: any, body: any) => {
    return axiosClient.put(url, body);
}

export const deleteData = (url: any, id: any) => {
    let deleteurl = `${url}/${id}`
    return axiosClient.delete(deleteurl, id);
}


