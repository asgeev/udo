import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/pl'
import dayjs from 'dayjs'
import plPL from 'antd/locale/pl_PL'

dayjs.locale('pl')

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider locale={plPL}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
)
