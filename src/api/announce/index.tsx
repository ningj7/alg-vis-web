import Request from "..";

interface Response {
    id: number;
    title: string;
    content: string;
    createTime: string;
    updateTime: string;
}


export const GetData = async (): Promise<Response[]> => {
    const response = await Request.get('/announce/list');
    return response.data;
};

interface AddDataRequest {
    title: string;
    content: string;
}

export const AddData = async (data:AddDataRequest): Promise<void> => {
    const response = await Request.post('/announce/insert', data);
    return response.data;
};

export const DeleteData = async (id: number): Promise<void> => {
    await Request.delete(`/announce/delete/${id}`);
};

interface UpdateDataRequest {
    id: number;
    title: string;
    content: string;
}
export const UpdateData = async (data:UpdateDataRequest): Promise<Response> => {
    const response = await Request.post(`/announce/update`, data);
    return response.data;
};