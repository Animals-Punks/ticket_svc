import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { AbstractDto } from '@common/dto/abstract.dto';

export class TicketNumberEnumDto extends AbstractDto {
    @IsNotEmpty()
    @IsNumber()
    readonly currentTicketNumber: number;

    @IsNotEmpty()
    @IsString()
    readonly type: string;
}
