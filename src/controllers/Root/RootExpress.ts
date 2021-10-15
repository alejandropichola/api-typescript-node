import Links, { LinkType } from "./Links";
import BaseController from "../BaseController";
import { Request, Response, NextFunction } from "express";

export default class RootController extends BaseController {
  links: LinkType | null = null;
  constructor(api: any, req: Request, res: Response, next: NextFunction) {
    super(api, req, res, next);
    this._init();

    return this;
  }

  _init() {
    this.links = null;
  }

  _reset() {
    this._initBase();

    this._init();
  }

  getLinks() {
    this._reset();

    return Promise.resolve()
      .then(() => {
        return this._getParameters();
      })
      .then(() => {
        return this._getContent();
      })
      .then(() => {
        return this._response();
      })
      .catch(this.next);
  }

  _getParameters() {
    this._getBaseParameters();
  }

  _getContent() {
    this.links = Links.getLinks(this.path);
  }

  _response() {
    this.res.json(this.links);
  }
}
