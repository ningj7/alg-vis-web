import { FC, useEffect } from "react";
import { Navigate, RouteObject, useRoutes, useLocation, useNavigate } from "react-router-dom";
import YingXiongTie from "../pages/yingxiongtie"
import SiGuoYa from "../pages/siguoya"
import KaiWuPo from "../pages/kaiwupo";
import TianJiGe from "../pages/tianjige"
import JianYanTang from "../pages/jianyantang"
import { message } from "antd";

/**
 * 路由器声明
 * - /yingxiongtie -> 英雄帖
 * - * 重定向到 /
 * 
 */
const routes: RouteObject[] = [
    {
        path: "*",
        element: <Navigate to="/SiguoYa" />
    },
    {
        path: "/yingxiongtie",
        element: <YingXiongTie />
    },
    {
        path: "/siguoya",
        element: <SiGuoYa />
    },
    {
        path: "/kaiwupo",
        element: <KaiWuPo />
    },
    {
        path: "/tianjige",
        element: <TianJiGe />
    },
    {
        path: "/jianyantang",
        element: <JianYanTang />
    }
];

/**
 * 路由组件
 */
const Router: FC = () => {
    // outlet——路由渲染组件. 依据路由关系，基于 url 映射到对应组件. （方法来自 react-router-dom）
    const outlet = useRoutes(routes);
    // 获取路由位置信息. （方法来自 react-router-dom）
    const location = useLocation();

    // 获取登录用户信息
    const user = sessionStorage.getItem("token");
    if (!user && location.pathname != "/yingxiongtie") {
        message.warning("请先登录！");
        return <Navigate to="/yingxiongtie" />;
    }

    return outlet;
};

export default Router;
