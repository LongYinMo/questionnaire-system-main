import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Spin } from 'antd'
import routerConfig from './router'
import 'antd/dist/reset.css'
import './App.css'

// 添加全局加载样式
const style = document.createElement('style');
style.textContent = `.app-loading { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); }`;
document.head.appendChild(style);

function App() {
  return (
    <Suspense fallback={<Spin tip="加载中..." className="app-loading" />}>
      <RouterProvider router={routerConfig}></RouterProvider>
    </Suspense>
  )
}

export default App
