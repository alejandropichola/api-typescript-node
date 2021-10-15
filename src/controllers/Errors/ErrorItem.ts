export interface ErrorType {
    code: string;
    sourcePointer: string;
    message: string;
    name?: string;
    stack?: string;
}

export default class ErrorItem {
    code: string;
    sourcePointer: string;
    message: string;
    constructor(data: ErrorType) {
        this.code = data.code
        this.sourcePointer = data.sourcePointer
        this.message = data.message

        return this
    }
}