'use strict';

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TicketNumberDto {
    @IsNotEmpty()
    @IsNumber()
    readonly ticketNumber: number;

    @IsNotEmpty()
    @IsString()
    readonly ticketType: string;
}
