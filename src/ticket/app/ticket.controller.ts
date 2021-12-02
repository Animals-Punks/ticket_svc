import { Controller, Get, Inject } from '@nestjs/common';

import { ITicketService } from '@ticket/domain/interfaces/ticket.interface';

@Controller('ticket')
export class TicketController {
    constructor(
        @Inject('TicketService')
        private readonly ticketService: ITicketService
    ) {}

    @Get()
    healthCheck(): string {
        return this.ticketService.healthCheck();
    }
}
