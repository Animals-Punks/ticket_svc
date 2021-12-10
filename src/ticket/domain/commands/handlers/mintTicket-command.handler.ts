import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import { NotTicketConditionException } from '@common/errors/http.error';
import { MintTicketCommand } from '@ticket/domain/commands/impl/mintTicket.command';
import { IMintedApV1Repository } from '@ticket/domain/interfaces/repository/mintedV1-repository.interface';
import { IMintedApV2Repository } from '@ticket/domain/interfaces/repository/mintedV2-repository.interface';
import { MintedApV1Repository } from '@ticket/infra/mintedV1.repository';
import { MintedApV2Repository } from '@ticket/infra/mintedV2.repository';
import { TicketRepository } from '@src/ticket/infra/ticket.repository';
import { ITicketRepository } from '../../interfaces/repository/ticket-repository.interface';

@CommandHandler(MintTicketCommand)
export class MintTicketCommandHandler
    implements ICommandHandler<MintTicketCommand>
{
    constructor(
        @InjectRepository(TicketRepository)
        private readonly _ticketRepository: ITicketRepository,
        @InjectRepository(MintedApV1Repository)
        private readonly _mintedApV1Repository: IMintedApV1Repository,
        @InjectRepository(MintedApV2Repository)
        private readonly _mintedApV2Repository: IMintedApV2Repository
    ) {}

    async execute(mintTicketInfo: MintTicketCommand) {
        const { _mintTicketInfo } = mintTicketInfo;
        // const property = [{
        //     trait_type: "V1",
        //     value: 0,
        // }, {
        //     trait_type: "V1",
        //     value: 1,
        // }, {
        //     trait_type: "V2",
        //     value: 0,
        // }, {
        //     trait_type: "V2",
        //     value: 1
        // }];

        const ticketId = uuidv4({ random: randomBytes(16) });

        for (const useAp of _mintTicketInfo.usedAps) {
            if (useAp.trait_type === 'V1') {
                this._mintedApV1Repository.saveUsedAp({
                    ticketType: _mintTicketInfo.ticketType,
                    apNumber: useAp.value,
                    ticketId: ticketId,
                });
            } else if (useAp.trait_type === 'V2') {
                this._mintedApV2Repository.saveUsedAp({
                    ticketType: _mintTicketInfo.ticketType,
                    apNumber: useAp.value,
                    ticketId: ticketId,
                });
            } else {
                throw new NotTicketConditionException(
                    'AP Ticket must be minting with V1 or V2'
                );
            }
        }

        this._ticketRepository.saveTicketInfo({
            ticketNumber: _mintTicketInfo.ticketNumber,
            imageUrl: _mintTicketInfo.imageUrl,
            ticketType: _mintTicketInfo.ticketType,
            ticketId: ticketId,
        });

        // const parseProperty = JSON.stringify(_mintTicketInfo.usedAps);

        // const mintResult = await this._caverJsService.mintTicket({
        //     mintAddress: _mintTicketInfo.address,
        //     property: parseProperty,
        //     imageUrl: _mintTicketInfo.imageUrl,
        // });
        return { minted: true };
    }
}
