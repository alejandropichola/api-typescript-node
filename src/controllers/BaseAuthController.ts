import jwt from "jsonwebtoken";
import moment from "moment";
import BaseController from "./BaseController";
import RequireJSONException from "../exceptions/RequireJSONException";
import enviroment from "../../config/config";
import { Request, Response, NextFunction } from "express";

const env = process.env.NODE_ENV || "development";
// @ts-ignore
const config = enviroment[env];

export default class BaseAuthController extends BaseController {
  token!: string;
  constructor(app: unknown, req: Request, res: Response, next: NextFunction) {
    super(app, req, res, next);
    this._initBaseAuth();

    return this;
  }

  _initBaseAuth() {
    this.token = "";
  }

  _getBaseAuthParameters() {
    this._getBaseParameters();

    this._getJWTToken();
  }

  _getJWTToken() {
    this.token =
      (this.req.header("Authorization") as string) ||
      (this.req.query.token as string) ||
      "";
    // this.token = AuthHelper.jwtTokenParam(this.token)
  }

  _requireJSON() {
    const contentType = this.req.get("content-type") || "";

    if (contentType !== "application/json") {
      // const msgLang = this.__("JSON content-type required");
      throw new RequireJSONException('error');
    }
  }
}
