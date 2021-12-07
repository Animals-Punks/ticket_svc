export interface SaveUesdApInput {
    ticketType: string;
    apNumber: number;
}

export interface IMintedApV1Repository {
    saveUsedAp(saveUesdApInput: SaveUesdApInput): Promise<boolean>;
}
