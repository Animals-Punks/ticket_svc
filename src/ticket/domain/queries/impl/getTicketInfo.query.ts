import { IQuery } from '@nestjs/cqrs';

import { TicketNumberDto } from '@src/ticket/domain/dtos/ticketNumber.dto';

export class GetTicketInfoQuery implements IQuery {
    constructor(public readonly _ticketNumber: TicketNumberDto) {}
}