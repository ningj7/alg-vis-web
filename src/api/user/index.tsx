import Request from "..";

/**
 * 获取用户信息响应参数
 */
export interface UserResp {
    // 错误码 0——成功 其他——失败
    code: number
    // 错误信息
    message: string
    // 用户信息
    data: User
};

/**
 * 用户信息
 */
export interface User {
    // 昵称
    nickName: string
    // 身份
    role: number
    // 状态
    status: number
    // 头像  
    avatarUrl: string
};

/**
 * @brief 向服务端发送请求查询用户信息
 * @param user ——账号
 * @returns UserResp
 */
export const GetUser = async (): Promise<UserResp> => {
    return Request.get("/user/query", { method: "get" });
};
