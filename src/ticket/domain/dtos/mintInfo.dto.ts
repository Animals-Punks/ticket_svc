'use strict';

import { IsArray, IsNumber, IsString } from 'class-validator';

export class MintInfoDto {
    @IsString()
    readonly ticketType: string;
    readonly address: string;
    readonly imageUrl: string;

    @IsNumber()
    readonly ticketNumber: number;

    @IsArray()
    readonly usedAps: any[];
}
