import Request from "..";


export interface User {
  id: number;
  avatarUrl: string;
  nickName: string;
  gender: number;
  account: string;
  role: number;
  status: number;
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

export interface UpdateRequest {
  id: number;
  nickName?: string;
  gender?: number;
  role?: number;
  avatarUrl?: string;
  status?: number;
  password?: string; // 密码可选
  resetPassword?: boolean;
}

export const UpdateUser = async (data: UpdateRequest): Promise<number> => {
  return Request.post("/user/update", data);
}