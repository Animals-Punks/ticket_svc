import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { GetTicketInfoQuery } from '@ticket/domain/queries/impl/getTicketInfo.query';
import { ITicketRepository } from '@ticket/domain/interfaces/repository/ticket-repository.interface';
import { TicketNotFoundException } from '@common/errors/http.error';
import { TicketRepository } from '@ticket/infra/ticket.repository';
import { MintedApV1Repository } from '@ticket/infra/mintedV1.repository';
import { IMintedApV1Repository } from '@ticket/domain/interfaces/repository/mintedV1-repository.interface';
import { MintedApV2Repository } from '@ticket/infra/mintedV2.repository';
import { IMintedApV2Repository } from '@ticket/domain/interfaces/repository/mintedV2-repository.interface';

@QueryHandler(GetTicketInfoQuery)
export class GetTicketInfoQueryHandler
    implements IQueryHandler<GetTicketInfoQuery>
{
    constructor(
        @InjectRepository(TicketRepository)
        private readonly _ticketRepository: ITicketRepository,
        @InjectRepository(MintedApV1Repository)
        private readonly _mintedApV1Repsotory: IMintedApV1Repository,
        @InjectRepository(MintedApV2Repository)
        private readonly _mintedV2Repository: IMintedApV2Repository
    ) {}

    async execute(ticketNumber: GetTicketInfoQuery) {
        const { _ticketNumber } = ticketNumber;
        const ticketId = _ticketNumber.ticketNumber;
        const type = _ticketNumber.ticketType;
        const ticketInfo = await this._ticketRepository.findOneByTicketNumber(
            ticketId,
            type
        );
        if (ticketInfo) {
            const property = [];
            const usedV2Aps = await this._mintedV2Repository.getUsedAp({
                ticketId: ticketInfo.id,
            });
            if (type === 'diamond') {
                const usedV1Aps = await this._mintedApV1Repsotory.getUsedAp({
                    ticketId: ticketInfo.id,
                });
                for (const usedV1Ap of usedV1Aps) {
                    const v1Result = {
                        trait_type: 'V1',
                        value: usedV1Ap.apNumber,
                    };
                    property.push(v1Result);
                }
            }
            for (const usedV2Ap of usedV2Aps) {
                const v2Result = {
                    trait_type: 'V2',
                    value: usedV2Ap.apNumber,
                };
                property.push(v2Result);
            }
            let ticketNameType = 'Gold';
            let imageUrl =
                'https://www.arabnews.com/sites/default/files/main-image/2021/10/12/2856941-1975758329.jpg';
            const ticketTypeProperty = {
                trait_type: 'type',
                value: 'gold',
            };
            property.push(ticketTypeProperty);
            if (type === 'diamond') {
                ticketNameType = 'Diamond';
                const diamondTicketTypeProperty = {
                    trait_type: 'type',
                    value: 'diamond',
                };
                property.push(diamondTicketTypeProperty);
                imageUrl =
                    'https://m.media-amazon.com/images/I/615HMgt2EoL._UY625_.jpg';
            }
            const result = {
                name: `Zoo Ticket ${ticketNameType} #${ticketId}`,
                image: imageUrl,
                attributes: property,
            };
            return result;
        }
        throw new TicketNotFoundException('There is not have any ticket');
    }
}
