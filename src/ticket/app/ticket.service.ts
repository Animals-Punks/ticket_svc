import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import {
    GetTicketInfoParmas,
    GetTicketInfoReturn,
    ITicketService,
} from '@ticket/domain/interfaces/ticket.interface';
import { GetTicketInfoQuery } from '@ticket/domain/queries/impl/getTicketInfo.query';

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
}
