export interface User {
    username: string
    email: string
}

export interface CreateUserRequest {
    username: string
    email: string
    password: string
}
