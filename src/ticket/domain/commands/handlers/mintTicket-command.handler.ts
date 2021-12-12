import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { NotTicketConditionException } from '@common/errors/http.error';
import { MintTicketCommand } from '@ticket/domain/commands/impl/mintTicket.command';
import { IMintedApV1Repository } from '@ticket/domain/interfaces/repository/mintedV1-repository.interface';
import { IMintedApV2Repository } from '@ticket/domain/interfaces/repository/mintedV2-repository.interface';
import { MintedApV1Repository } from '@ticket/infra/mintedV1.repository';
import { MintedApV2Repository } from '@ticket/infra/mintedV2.repository';
import { TicketRepository } from '@ticket/infra/ticket.repository';
import { ITicketRepository } from '@ticket/domain/interfaces/repository/ticket-repository.interface';
import { TicketNumberEnumRepository } from '@ticket/infra/ticketNumberEnum.repository';
import { ITicketNumberEnumRepository } from '@ticket/domain/interfaces/repository/ticketNumberEnum-repository.interface';

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
        private readonly _mintedApV2Repository: IMintedApV2Repository,
        @InjectRepository(TicketNumberEnumRepository)
        private readonly _ticketNumberEnumRepository: ITicketNumberEnumRepository
    ) {}

    async execute(mintTicketInfo: MintTicketCommand) {
        const { _mintTicketInfo } = mintTicketInfo;

        const ticketNumberInfo =
            await this._ticketNumberEnumRepository.findOneTicketNumberByType(
                _mintTicketInfo.ticketType
            );
        const ticketNumber = ticketNumberInfo.currentTicketNumber;

        const ticketInfo = await this._ticketRepository.saveTicketInfo({
            ticketNumber: ticketNumber,
            imageUrl: _mintTicketInfo.imageUrl,
            ticketType: _mintTicketInfo.ticketType,
        });

        const ticketId = ticketInfo.id;

        for (const useAp of _mintTicketInfo.usedAps) {
            if (useAp.trait_type === 'V1') {
                const usedAp =
                    await this._mintedApV1Repository.getGetApByApNumber({
                        apNumber: useAp.value,
                    });
                if (usedAp) {
                    throw new NotTicketConditionException('V1 is Used');
                }
                this._mintedApV1Repository.saveUsedAp({
                    ticketType: _mintTicketInfo.ticketType,
                    apNumber: useAp.value,
                    ticketId: ticketId,
                });
            } else if (useAp.trait_type === 'V2') {
                const usedAp =
                    await this._mintedApV2Repository.getGetApByApNumber({
                        apNumber: useAp.value,
                    });
                if (usedAp) {
                    throw new NotTicketConditionException('V2 is Used');
                }
                this._mintedApV2Repository.saveUsedAp({
                    ticketType: _mintTicketInfo.ticketType,
                    apNumber: useAp.value,
                    ticketId: ticketId,
                });
            } else if (useAp.trait_type === 'type') {
            } else {
                throw new NotTicketConditionException(
                    'AP Ticket must be minting with V1 or V2'
                );
            }
        }

        const updateResult =
            await this._ticketNumberEnumRepository.updateTicketNumberByType({
                type: _mintTicketInfo.ticketType,
                ticketNumber: ticketNumber + 1,
            });

        if (updateResult === true) {
            return { minted: ticketNumber };
        } else {
            return { minted: ticketNumber };
        }
    }
}
