import { IsNumber, IsString } from 'class-validator';

import { AbstractDto } from '@common/dto/abstract.dto';

export class MintedApDto extends AbstractDto {
    @IsString()
    readonly ticketType: string;

    @IsNumber()
    readonly apNumber: number;
    readonly ticketNumber: number;
}
