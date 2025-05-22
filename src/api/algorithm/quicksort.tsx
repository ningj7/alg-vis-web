import Request from '..';

export interface Params {
    num: number;
    array: number[];
}


export interface StepResult {
    array: number[];
    status: number[];
    index: number;
}

export const sendQuickSortData = async (params: Params): Promise<StepResult[]> => {
    const response = await Request.post('/algorithms/quickSort', params);
    return response.data;
};