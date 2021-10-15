import BaseException from "./BaseException";
import HttpCodes from "../config/HttpCodes";

export default class NotFoundException extends BaseException {
    name: string;
    status: number;

    constructor(message: string = 'Not found') {
        super(message);
        this.name = HttpCodes.NOT_FOUND.msg;
        this.status = HttpCodes.NOT_FOUND.code
    }
}