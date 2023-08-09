import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {QrAttendanceApp} from "./QrAttendanceApp";
import {Provider} from "react-redux";

import {store} from "./store";
import {AxiosInterceptor} from "./interceptors";
import {CheckingAuth} from "./iu";
import {AppTheme} from "./theme";

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
          <AppTheme>
              <Suspense fallback={<CheckingAuth />}>
                  <BrowserRouter>
                      <QrAttendanceApp />
                  </BrowserRouter>
              </Suspense>
          </AppTheme>
      </Provider>
  </React.StrictMode>
)
