import { IsString } from 'class-validator';

import { AbstractDto } from '@common/dto/abstract.dto';

export class MintedApV1Dto extends AbstractDto {
    @IsString()
    readonly ticketType: string;
    readonly apNumber: string;

    @IsString()
    readonly ticketId: string;
}
