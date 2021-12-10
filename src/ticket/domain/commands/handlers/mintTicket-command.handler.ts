import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { MintTicketCommand } from '@ticket/domain/commands/impl/mintTicket.command';
import { ICaverJsService } from '@shared/interfaces/caverJs/caverJs.interface';
import { MintedApV1 } from '@src/ticket/domain/models/mintedApV1.entity';
import { IMintedApV1Repository } from '@ticket/domain/interfaces/repository/mintedV1-repository.interface';
import { MintedApV2 } from '@src/ticket/domain/models/mintedApV2.entity';
import { IMintedApV2Repository } from '@ticket/domain/interfaces/repository/mintedV2-repository.interface';
import { NotTicketConditionException } from '@common/errors/http.error';

@CommandHandler(MintTicketCommand)
export class MintTicketCommandHandler
    implements ICommandHandler<MintTicketCommand>
{
    constructor(
        @Inject('CaverJsService')
        private readonly _caverJsService: ICaverJsService,
        @InjectRepository(MintedApV1)
        private readonly _mintedApV1Repository: IMintedApV1Repository,
        @InjectRepository(MintedApV2)
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

        for (const useAp of _mintTicketInfo.usedAps) {
            if (useAp.trait_type === 'V1') {
                this._mintedApV1Repository.saveUsedAp({
                    ticketType: _mintTicketInfo.ticketType,
                    apNumber: useAp.value,
                });
            } else if (useAp.trait_type === 'V2') {
                this._mintedApV2Repository.saveUsedAp({
                    ticketType: _mintTicketInfo.ticketType,
                    apNumber: useAp.value,
                });
            } else {
                throw new NotTicketConditionException(
                    'AP Ticket must be minting with V1 or V2'
                );
            }
        }
        const parseProperty = JSON.stringify(_mintTicketInfo.usedAps);

        const mintResult = await this._caverJsService.mintTicket({
            mintAddress: _mintTicketInfo.address,
            property: parseProperty,
            imageUrl: _mintTicketInfo.imageUrl,
        });
        return mintResult;
    }
}
