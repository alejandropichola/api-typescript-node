import httpCode from '../config/HttpCodes'

export default class BaseException extends Error {
    name: string;
    status: number;
    constructor(message: string) {
        super(message)

        this.name = httpCode.INTERNAL_SERVER_ERROR.msg
        this.status = httpCode.INTERNAL_SERVER_ERROR.code
    }
}