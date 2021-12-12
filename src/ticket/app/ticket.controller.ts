import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { ITicketService } from '@ticket/domain/interfaces/ticket.interface';
import { TicketInfoDto } from '@ticket/domain/dtos/ticketInfo.dto';
import { MintInfoDto } from '@ticket/domain/dtos/mintInfo.dto';
import { MintResultDto } from '@ticket/domain/dtos/mintResult.dto';

@Controller()
export class TicketController {
    constructor(
        @Inject('TicketService')
        private readonly ticketService: ITicketService
    ) {}

    @Get()
    healthCheck(): string {
        return this.ticketService.healthCheck();
    }

    @Get('ticket/info/:ticketType/:number')
    async ticketInfo(
        @Param('ticketType')
        ticketType: string,
        @Param('number')
        ticketNumber: number
    ): Promise<TicketInfoDto> {
        const tokenInfo = await this.ticketService.getTicketInfo({
            ticketType,
            ticketNumber,
        });
        return tokenInfo;
    }

    @Post('ticket/mint')
    async mintTicket(
        @Body()
        mintInfo: MintInfoDto
    ): Promise<MintResultDto> {
        const mintResult = await this.ticketService.mintTicket({ ...mintInfo });
        return mintResult;
    }
}
