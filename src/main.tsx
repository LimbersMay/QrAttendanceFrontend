import React from 'react'
import ReactDOM from 'react-dom/client'
import {QrAttendanceApp} from "./QrAttendanceApp";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <QrAttendanceApp />
    </BrowserRouter>
  </React.StrictMode>,
)
