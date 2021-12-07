'use strict';

import { IsArray, IsString } from 'class-validator';

export class MintInfoDto {
    @IsString()
    readonly ticketType: string;
    readonly address: string;
    readonly imageUrl: string;

    @IsArray()
    readonly usedAps: any[];
}
