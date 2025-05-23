import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

