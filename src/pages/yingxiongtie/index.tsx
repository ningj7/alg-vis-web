// FC——react 函数式组件
import { FC } from "react";

// 登录盒子组件
import LoginCard from "../../components/logincard";
// 英雄帖模块的专属样式
import styles from "./yingxiongtie.module.scss";

/**
 * 登录页面——英雄帖
 */
const Page: FC = () => {
    return (
        <div className={styles.page}>
            {/* 组件一：登录盒子 */}
            <LoginCard />
        </div>)
};

export default Page;