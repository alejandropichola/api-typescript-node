import jwt from "jsonwebtoken";
import NotFoundException from "../../exceptions/NotFoundException";
import ForbiddenException from "../../exceptions/ForbiddenException";
import BadParametersException from "../../exceptions/BadParametersException";
import RequireJSONException from "../../exceptions/RequireJSONException";
import UserAuthException from "../../exceptions/UserException";
import HttpCodes from "../../config/HttpCodes";
import ErrorCodes from "../../config/ErrorCodes";
import { ErrorType } from "./ErrorItem";
import { Response } from "express";

export interface ErrorsTypes {
  status: number;
  title?: string;
  code: number;
  source: {
    pointer: string;
  };
  detail: string;
  meta?: string;
}

export interface TransformResponseType {
  errors: Array<ErrorsTypes>;
  meta?: {
    trace: any
  };
  status: number;
}

export default class ErrorController {
  static notFound() {
    throw new NotFoundException("Route not found");
  }

  static show(error: any, res: Response) {
    ErrorController.log(error);

    const { errors, status } = ErrorController.transform(error);

    ErrorController.response(errors, status, res);
  }

  static log(error: any) {
    console.error(error);
  }

  static transform(error: ErrorType): TransformResponseType {
    let errors: Array<ErrorsTypes> = [];

    let status = HttpCodes.INTERNAL_SERVER_ERROR.code;
    let code;
    if (
      error instanceof NotFoundException ||
      error instanceof ForbiddenException ||
      error instanceof BadParametersException ||
      error instanceof RequireJSONException ||
      error instanceof UserAuthException
    ) {
      status = error.status;
    }

    if (error instanceof BadParametersException) {
      for (const badParam of error.badParams) {
        const item: ErrorsTypes = {
          status: status,
          title: error.name,
          code: badParam.code,
          source: {
            pointer: badParam.sourcePointer,
          },
          detail: badParam.message,
        };

        errors.push(item);
      }
    } else if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      status = HttpCodes.UNAUTHORIZED.code;

      code = ErrorCodes.JWT_TOKEN_INVALID;

      if (error instanceof jwt.TokenExpiredError) {
        code = ErrorCodes.JWT_TOKEN_EXPIRED;
      } else if (error.message === "jwt must be provided") {
        code = ErrorCodes.JWT_TOKEN_REQUIRED;
      }
      const item: ErrorsTypes = {
        status: status,
        title: error.name,
        code: code,
        source: {
          pointer: "/header/token",
        },
        detail: error.message,
      };
      errors.push(item);
    }

    const env = process.env.NODE_ENV || "local";
    const response: TransformResponseType = { errors, status };
    if (env !== "production") {
      response.meta = {
        trace: error.stack,
      };
    }

    return response;
  }

  static response(errors: Array<ErrorsTypes>, status: number, res: Response) {
    res.status(status).json(errors);
  }
}
