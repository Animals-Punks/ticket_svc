import { Controller, Get, Inject, Query } from '@nestjs/common';

import { ITicketService } from '@ticket/domain/interfaces/ticket.interface';
import { TicketNumberDto } from '../domain/dtos/ticketNumber.dto';

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

    @Get('info')
    async ticketInfo(
        @Query()
        ticketNumber: TicketNumberDto
    ) {
        return this.ticketService.getTicketInfo({ ...ticketNumber });
    }
}
