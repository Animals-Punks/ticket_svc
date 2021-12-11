import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';

import { GetTicketInfoQuery } from '@ticket/domain/queries/impl/getTicketInfo.query';
import { ITicketRepository } from '@ticket/domain/interfaces/repository/ticket-repository.interface';
import { ICaverJsService } from '@shared/interfaces/caverJs/caverJs.interface';
import { TicketNotFoundException } from '@common/errors/http.error';
import { TicketRepository } from '@ticket/infra/ticket.repository';

@QueryHandler(GetTicketInfoQuery)
export class GetTicketInfoQueryHandler
    implements IQueryHandler<GetTicketInfoQuery>
{
    constructor(
        @InjectRepository(TicketRepository)
        private readonly _ticketRepository: ITicketRepository,
        @Inject('CaverJsService')
        private readonly _caverJsService: ICaverJsService
    ) {}

    async execute(ticketNumber: GetTicketInfoQuery) {
        const { _ticketNumber } = ticketNumber;
        const ticketId = _ticketNumber.ticketNumber;
        const ticketInfo = await this._ticketRepository.findOneByTicketNumber(
            ticketId
        );
        if (ticketInfo) {
            const property = await this._caverJsService.getMetaData(ticketId);
            const imageUrl = await this._caverJsService.getImageUrl(ticketId);
            const result = {
                name: `${ticketInfo.ticketType} #${ticketInfo.ticketNumber}`,
                image: imageUrl,
                attributes: property,
            };
            return result;
        }
        throw new TicketNotFoundException('There is not have any ticket');
    }
}
