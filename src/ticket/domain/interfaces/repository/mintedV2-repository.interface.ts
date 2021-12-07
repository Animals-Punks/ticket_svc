export interface SaveUesdApInput {
    ticketType: string;
    apNumber: number;
}

export interface IMintedApV2Repository {
    saveUsedAp(saveUesdApInput: SaveUesdApInput): Promise<boolean>;
}
