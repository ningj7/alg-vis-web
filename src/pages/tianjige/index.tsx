// react 函数式组件
import { FC } from "react";
import { useNavigate } from 'react-router-dom';
// 组件一
// import TitleCard from "../../components/tianjigetitlecard";
// 组件二
import UserTableCard from "../../components/usertablecard";
// 模块专属样式
import styles from "./tianjige.module.scss";
import { Button } from 'antd';


/**
 * 天机阁视图
 */
const Page: FC = () => {
    const navigate = useNavigate();

    // 新增返回首页方法
    const handleReturnJianghu = () => {
        navigate('/');
        // 如果用window跳转：window.location.href = "/"
    };
    return (
        <div className={styles.page}>
            {/** 组件一 */}
            {/* <TitleCard /> */}
            {/** 组件二 */}
            <UserTableCard />
            <Button
                type="primary"
                className={styles.returnBtn}
                onClick={handleReturnJianghu}
                icon={<i className="iconfont icon-sword" />} // 如果有图标库
            >
                重出江湖
            </Button>

        </div>);
};

export default Page;