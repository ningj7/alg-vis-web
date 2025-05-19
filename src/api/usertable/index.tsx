import Request from "..";


export interface User {
  id: number;
  avatarUrl: string;
  nickName: string;
  gender:number;
  account: string;
  role: number;
  status: number;
  createTime: string;
}

export interface UserListResponse {
  code: number;
  message: string;
  data: {
    list: User[];
    total: number;
  };
}

/**
 * @brief 获取用户列表
 * @param params - 查询参数，包括分页和搜索条件
 */
export const GetUsers = async (
  params: {
    nickName?: string;
    account?: string;
    status?: string | number;
    pageNo?: number;
    pageSize?: number;
  }
): Promise<UserListResponse> => {
  return Request.get("/user/queryList", { params });
};