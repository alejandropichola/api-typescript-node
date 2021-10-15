import PathHelper from "../helpers/PathHelper";
import { Request, Response, NextFunction } from "express";

export default class BaseController {
    api;
    req;
    res;
    next;
    path!: string;
    include!: string;
    constructor(api: any, req: Request, res: Response, next: NextFunction) {
        this.api = api
        this.req = req
        this.res = res
        this.next = next

        this._initBase()
        return this
    }

    _initBase():void {
        this.path = ''
        this.include = ''
    }

    _getBaseParameters():void {
        this.path = this.req.protocol + '://' +
            this.req.get('host') +
            this.req.baseUrl + '/'

        this.include = this.req.query.include as string || ''
        this.include = PathHelper.includeParam(this.include)
    }
}