import { SignupForm } from "./SignupForm"

import { useTitle } from "../Hooks"

import "./SignupPage.css"

export const SignupPage = () => {
    useTitle("Sign Up")

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>

            <div className="signup-page-content">
                <SignupForm redirect="/me" />
            </div>
        </div>
    )
}
