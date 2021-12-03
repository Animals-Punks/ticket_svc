import { IsNumber, IsString } from 'class-validator';

import { AbstractDto } from '@common/dto/abstract.dto';

export class TicketDto extends AbstractDto {
    @IsNumber()
    readonly ticketNumber: string;

    @IsString()
    readonly imageUrl: string;
    readonly ticketType: string;
}
