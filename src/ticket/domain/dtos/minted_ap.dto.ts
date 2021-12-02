import { AbstractDto } from "@src/common/dto/abstract.dto";
import { IsNumber, IsString } from "class-validator";

export class MintedApDto extends AbstractDto {
    @IsString()
    readonly ticketType: string;
    
    @IsNumber()
    readonly apNumber: number;
    readonly ticketNumber: number;
}