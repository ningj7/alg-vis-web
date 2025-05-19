import Request from "..";

export interface Params {
  num: number;
  array: number[];
}

export interface StepResult {
  array: number[];
  tempArray?: number[] | null,
  comparing?: number[] | null;
  mergeRange?: [number, number] | null;
}
export const sendMergeSortData = async (params: Params): Promise<StepResult[]> => {
  const response = await Request.post('/algorithms/mergeSort', params);
  return response.data;
};