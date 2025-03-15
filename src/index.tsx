import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserManager, WebStorageStateStore } from "oidc-client-ts"
import React from "react"
import ReactDOM from "react-dom"
import { AuthProvider } from "react-oidc-context"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

import "./index.css"

// Adapted from this example project:
// https://github.com/authts/sample-keycloak-react-oidc-context
export const userManager = new UserManager({
    authority: process.env.REACT_APP_AUTHORITY || "",
    client_id: process.env.REACT_APP_CLIENT_ID || "",
    // redirect_uri: process.env.REACT_APP_REDIRECT_URI || "",
    redirect_uri: `${window.location.origin}${window.location.pathname}`,
    // post_logout_redirect_uri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI || "",
    post_logout_redirect_uri: window.location.origin,
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    monitorSession: true // this allows cross tab login/logout detection
})

const onSigninCallback = () => {
    window.history.replaceState({}, document.title, window.location.pathname)
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
