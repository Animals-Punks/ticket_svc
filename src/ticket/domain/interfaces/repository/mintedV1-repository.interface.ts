import { MintedApV1 } from '@ticket/domain/models/mintedApV1.entity';

export interface SaveUesdApInput {
    ticketType: string;
    apNumber: string;
    ticketId: string;
}

export interface GetUsedApInput {
    ticketId: string;
}

export interface GetGetApByApNumberInput {
    apNumber: string;
}

export interface IMintedApV1Repository {
    saveUsedAp(saveUesdApInput: SaveUesdApInput): Promise<boolean>;
    getGetApByApNumber(getGetApByApNumberInput: GetGetApByApNumberInput): Promise<MintedApV1>
    getUsedAp(getUsedApInput: GetUsedApInput): Promise<MintedApV1[]>;
}
