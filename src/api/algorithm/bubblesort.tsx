import Request from '..';

export interface Params {
  num: number;
  array: number[];
}


export interface StepResult {
  array: number[];
  curIndex: number | null;
  sortedTailIndex: number;
}

export const sendBubbleSortData = async (params: Params): Promise<StepResult[]> => {
  const response = await Request.post('/algorithms/bubbleSort', params);
  return response.data;
};