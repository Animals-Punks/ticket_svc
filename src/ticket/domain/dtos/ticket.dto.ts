import { IsArray, IsNumber, IsString } from 'class-validator';

import { AbstractDto } from '@common/dto/abstract.dto';

export class TicketDto extends AbstractDto {
    @IsNumber()
    readonly ticketNumber: number;

    @IsString()
    readonly imageUrl: string;
}
