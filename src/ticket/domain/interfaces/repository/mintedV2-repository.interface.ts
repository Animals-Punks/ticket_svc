import { MintedApV2 } from '@ticket/domain/models/mintedApV2.entity';

export interface SaveUesdApInput {
    ticketType: string;
    apNumber: number;
    ticketId: string;
}

export interface GetUsedApInput {
    ticketId: string;
}

export interface GetGetApByApNumberInput {
    apNumber: number;
}

export interface IMintedApV2Repository {
    saveUsedAp(saveUesdApInput: SaveUesdApInput): Promise<boolean>;
    getGetApByApNumber(getGetApByApNumberInput: GetGetApByApNumberInput): Promise<MintedApV2>
    getUsedAp(getUsedApInput: GetUsedApInput): Promise<MintedApV2[]>;
}
