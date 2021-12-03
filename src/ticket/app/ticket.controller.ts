import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';

import { ITicketService } from '@ticket/domain/interfaces/ticket.interface';
import { TicketInfoDto } from '@ticket/domain/dtos/ticketInfo.dto';
import { TicketNumberDto } from '@ticket/domain/dtos/ticketNumber.dto';
import { MintInfoDto } from '@ticket/domain/dtos/mintInfo.dto';
import { MintResultDto } from '@ticket/domain/dtos/mintResult.dto';

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
    ): Promise<TicketInfoDto> {
        const tokenInfo = await this.ticketService.getTicketInfo({
            ...ticketNumber,
        });
        return tokenInfo;
    }

    @Post('mint')
    async mintTicket(
        @Body()
        mintInfo: MintInfoDto
    ): Promise<MintResultDto> {
        const mintResult = await this.ticketService.mintTicket({ ...mintInfo });
        return mintResult;
    }
}
