import { Role } from "../User/member"
import { OnBoarding } from "../User/user"
import { UserStateService } from "../User/user-state.service"

export interface AuthStatus {
    isAuthenticated: boolean,
    roles: Role[],
    user?: any,
    onBoarding: OnBoarding
}
export interface AuthResponse {
    accessToken: string,
}
