import { Controller, Get, Inject } from '@nestjs/common';

import { ITicketService } from '@ticket/domain/interfaces/ticket.interface';

@Controller('nftName')
export class NftNameController {
    constructor(
        @Inject('TicketService')
        private readonly ticketService: ITicketService
    ) {}

    @Get()
    healthCheck(): string {
        return this.ticketService.healthCheck();
    }
}
