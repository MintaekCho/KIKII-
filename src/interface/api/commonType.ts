export interface CommonResponseType<T> {
    status: string;
    message: string;
    object: T;
}