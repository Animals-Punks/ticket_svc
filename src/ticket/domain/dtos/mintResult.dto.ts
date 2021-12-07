'use strict';

import { IsBoolean } from 'class-validator';

export class MintResultDto {
    @IsBoolean()
    readonly minted: boolean;
}
