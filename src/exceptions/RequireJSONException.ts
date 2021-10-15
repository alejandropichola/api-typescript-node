import BaseException from "./BaseException";
import HttpCodes from "../config/HttpCodes";

export default class RequireJSONException extends BaseException {
    name: string;
    status: number;

    constructor(message: string = 'JSON content-type required') {
        super(message);
        this.name = HttpCodes.UNSUPPORTED_MEDIA_TYPE.msg;
        this.status = HttpCodes.UNSUPPORTED_MEDIA_TYPE.code
    }
}