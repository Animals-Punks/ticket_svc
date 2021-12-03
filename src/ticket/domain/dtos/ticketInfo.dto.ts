'use strict';

import { IsArray, IsString } from 'class-validator';

export class TicketInfo {
    @IsString()
    readonly name: string;
    readonly image: string;

    @IsArray()
    readonly attributes: any[];
}
