'use strict';

import { IsNotEmpty, IsNumber } from 'class-validator';

export class TicketNumberDto {
    @IsNotEmpty()
    @IsNumber()
    readonly ticketNumber: number;
}
