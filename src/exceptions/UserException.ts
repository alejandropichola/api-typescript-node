import BaseException from "./BaseException";
import HttpCodes from "../config/HttpCodes";

export default class RequireJSONException extends BaseException {
    name: string;
    status: number;

    constructor(message: string = 'Unauthorized') {
        super(message);
        this.name = HttpCodes.UNAUTHORIZED.msg;
        this.status = HttpCodes.UNAUTHORIZED.code
    }
}