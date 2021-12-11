import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { MintedFailedException } from '@common/errors/http.error';
import {
    GetTicketInfoParmas,
    GetTicketInfoReturn,
    ITicketService,
    MintTicketParams,
} from '@ticket/domain/interfaces/ticket.interface';
import { GetTicketInfoQuery } from '@ticket/domain/queries/impl/getTicketInfo.query';
import { MintTicketCommand } from '@ticket/domain/commands/impl/mintTicket.command';

@Injectable()
export class TicketService implements ITicketService {
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus
    ) {}

    healthCheck(): string {
        return 'Server is Running 🚀';
    }

    async getTicketInfo(
        getTicketInfoParmas: GetTicketInfoParmas
    ): Promise<GetTicketInfoReturn> {
        const ticket = await this._queryBus.execute(
            new GetTicketInfoQuery(getTicketInfoParmas)
        );
        return ticket;
    }

    @Transactional()
    async mintTicket(
        mintTicketParams: MintTicketParams
    ): Promise<{ minted: number }> {
        try {
            const mintResult = await this._commandBus.execute(
                new MintTicketCommand(mintTicketParams)
            );
            return { minted: mintResult };
        } catch (error) {
            throw new MintedFailedException(`Minted Failed: ${error}`);
        }
    }
}
