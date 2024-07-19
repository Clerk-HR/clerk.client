export interface ApiSuccess {
    data: object,
    message: string
}

export interface ApiError {
    code: number,
    messages: string[]
}