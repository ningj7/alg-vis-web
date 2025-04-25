// FC——react 函数式组件
import { FC } from "react";
import UserCard from "../../components/usercard"
import MapCard from "../../components/mapcard"
import styles from "./siguoya.module.scss"

/**
 * 首页面
 */
const Page: FC = () => {
    return (
        <div className={styles.page}>
            <UserCard />
            <MapCard />
        </div>)
};

export default Page;