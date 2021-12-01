import { IsString } from 'class-validator';

import { AbstractDto } from '@common/dto/abstract.dto';

export class TicketDto extends AbstractDto {
    @IsString()
    readonly name: string;
    readonly url: string;
}
