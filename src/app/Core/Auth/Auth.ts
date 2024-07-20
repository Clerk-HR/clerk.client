import { Role } from "../User/member"
import { OnBoarding } from "../User/user"

export interface UserState {
    isAuthenticated: boolean,
    roles: Role[],
    user?: any,
    onBoarding: OnBoarding
}
export interface AuthResponse {
    accessToken: string,
}
