import BaseException from "./BaseException";
import HttpCodes from "../config/HttpCodes";

export default class BadParametersException extends BaseException {
    name: string;
    status: number;
    badParams: any;

    constructor(badParams: any, message: string = 'Bad parameters') {
        super(message);
        this.name = HttpCodes.BAD_REQUEST.msg;
        this.status = HttpCodes.BAD_REQUEST.code
        this.badParams = badParams;
    }
}