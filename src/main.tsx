import React from 'react'
import ReactDOM from 'react-dom/client'
import {QrAttendanceApp} from "./QrAttendanceApp";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import {store} from "./store";
import {AxiosInterceptor} from "./interceptors";

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <QrAttendanceApp />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
