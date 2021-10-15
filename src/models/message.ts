import { Model, DataTypes, Optional } from "sequelize";
import { SequelizeDb } from "./index";

export interface MessageType {
  id: number;
  msg: string;
  tags: string;
}

interface MessageCreationAttribute extends Optional<MessageType, "id"> {}

export class MessageModel
  extends Model<MessageType, MessageCreationAttribute>
  implements MessageType
{
  public id!: number;
  public msg!: string;
  public tags!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MessageModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    msg: {
      type: new DataTypes.STRING(250),
      allowNull: false,
    },
    tags: {
      type: new DataTypes.STRING(250),
      allowNull: false,
    },
  },
  { sequelize: SequelizeDb, tableName: "message" }
);
