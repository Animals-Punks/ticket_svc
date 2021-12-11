'use strict';

import { IsNumber } from 'class-validator';

export class MintResultDto {
    @IsNumber()
    readonly minted: number;
}
