import BaseException from "./BaseException";
import HttpCodes from "../config/HttpCodes";

export default class ForbiddenException extends BaseException {
    name: string;
    status: number;
    badParams: any;

    constructor(message: string = 'Forbidden') {
        super(message);
        this.name = HttpCodes.FORBIDDEN.msg;
        this.status = HttpCodes.FORBIDDEN.code
    }
}