// TODO: store securely (e.g. https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)
export const getToken = () => sessionStorage.getItem("token")
export const setToken = (token: string) => sessionStorage.setItem("token", token)
export const removeToken = () => sessionStorage.removeItem("token")