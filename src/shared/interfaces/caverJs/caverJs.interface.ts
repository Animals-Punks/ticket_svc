export interface ICaverJsService {
    getImageUrl(tokenId: number, type: string): Promise<string>;
    getMetaData(tokenId: number, type: string): Promise<any[]>;
}
