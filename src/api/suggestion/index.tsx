import Request from ".."

interface Response {
    id: number;
    topic: string;
    content: string;
    creatorName: string;
    createTime: string;
}

export const GetData = async (): Promise<Response[]> => {
    const response = await Request.get('/suggestion/list');
    return response.data;
};

export const AddData = async (data: { topic: string; content: string }): Promise<Response> => {
    const response = await Request.post('/suggestion/insert', data);
    return response.data;
};