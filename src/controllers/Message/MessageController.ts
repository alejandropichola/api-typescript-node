import { Request, Response, NextFunction } from "express";
import Message from "./Message";
import { MessageType } from "../../../src/models/message";
import BaseAuthController from "../BaseAuthController";
import BadParametersException from "../../exceptions/BadParametersException";

export default class MessageController extends BaseAuthController {
  id!: string;
  msg!: string;
  tags!: string;
  messages: Array<MessageType> = [];
  errors: [] = [];
  constructor(app: unknown, req: Request, res: Response, next: NextFunction) {
    super(app, req, res, next);
    this.init();
    return this;
  }

  init(): void {
    this.id = "";
    this.msg = "";
    this.tags = "";
  }

  reset(): void {
    this._initBase();
    this.init();
  }

  async getParameters(): Promise<void> {
    return Promise.resolve()
      .then(() => {
        this._getBaseAuthParameters();
        this._requireJSON();
        this.getMsg();
        this.getTags();
      })
      .then(() => {
        if (this.errors.length > 0) {
          throw new BadParametersException(this.errors);
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  async getParametersUpdate(): Promise<void> {
    return Promise.resolve()
      .then(() => {
        this._getBaseAuthParameters();
        this._requireJSON();
        this.getMsg();
        this.getTags();
        this.getId();
      })
      .then(() => {
        if (this.errors.length > 0) {
          throw new BadParametersException(this.errors);
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  getId(): void {
    this.id = this.req.params.id;
  }

  getMsg(): void {
    this.msg = this.req.body.msg;
  }

  getTags(): void {
    this.tags = this.req.body.tags;
  }

  getTagsParam(): void {
    this.tags = this.req.params.tags;
  }

  async getAllMessage(): Promise<void> {
    const response = await Message.getAllMessage();
    this.res.json({ response, status: 200 });
  }

  async getMessage(): Promise<void> {
    this.getId();
    const response = await Message.getMessage(this.id);
    this.res.json({ response, status: 200 })
  }

  async getAllMessageTag(): Promise<void> {
    const response = await Message.findMessageTags(this.tags);
    this.res.json({ response, status: 200 });
  }

  async createMessage(): Promise<void> {
    this.reset();
    return Promise.resolve()
      .then(() => {
        this.getParameters();
      })
      .then(() => {
        return Message.createMessage(this.msg, this.tags);
      })
      .then((response) => {
        this.res.json({ response, status: 203 });
      });
  }

  async updateMessage(): Promise<void> {
    this.reset();
    await this.getParametersUpdate();
    const response = await Message.updateMessage(this.id, this.msg, this.tags);
    this.res.json({ response, status: 203 });
  }

  async deleteMessage(): Promise<void> {
    this.reset();
    this.getId();
    const response = await Message.deleteMessage(this.id);
    this.res.json({ response, status: 203 });
  }

  async getMessageTags(): Promise<void> {
    this.reset();
    this.getTagsParam();
    const response = await Message.findMessageTags(this.tags);
    this.res.json({ response, status: 200 });
  }
}
