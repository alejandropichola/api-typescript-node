import { MessageModel } from "../../models/message";

import { Op } from "sequelize";

export default class Message {
  static getAllMessage() {
    return MessageModel.findAll();
  }

  static getMessage(id: string) {
    return MessageModel.findOne({
      where: {
        id,
      },
    });
  }

  static createMessage(msg: string, tags: string) {
    return MessageModel.create({
      msg,
      tags,
    });
  }

  static updateMessage(id: string, msg: string, tags: string) {
    return MessageModel.update(
      {
        msg,
        tags,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  static deleteMessage(id: string) {
    return MessageModel.destroy({
      where: {
        id,
      },
    });
  }

  static findMessageTags(tags: string) {
    return MessageModel.findAll({
      where: {
        tags: {
          [Op.like]: `%${tags}`,
        },
      },
    });
  }
}
