import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundExcption extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class TicketNotFoundException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class NotTicketConditionException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class MintedFailedException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
