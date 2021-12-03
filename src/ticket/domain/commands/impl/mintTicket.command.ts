import { ICommand } from '@nestjs/cqrs';

import { MintInfoDto } from '@ticket/domain/dtos/mintInfo.dto';

export class MintTicketCommand implements ICommand {
    constructor(public readonly _mintTicketInfo: MintInfoDto) {}
}
