// FC——react 函数式组件
import { FC } from "react";
import UserCard from "../../components/usercard"
import MapCard from "../../components/mapcard"
import CenterPanel from "../../components/centerPanel"
import styles from "./siguoya.module.scss"

/**
 * 首页面
 */
const Page: FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles.title}>思过崖</div>
            <UserCard />
            <MapCard />
            <div className={styles.centerWrapper}>
                <CenterPanel />
            </div>
            <div className={styles.footer}>© 2025 CodeSect · All Rights Reserved</div>
        </div>)
};

export default Page;