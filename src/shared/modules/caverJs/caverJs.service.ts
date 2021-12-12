import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
const Caver = require('caver-js');

import { ICaverJsService } from '@shared/interfaces/caverJs/caverJs.interface';
import { CaverJsModuleConfig } from '@config';

@Injectable()
export class CaverJsService implements ICaverJsService {
    constructor(
        @Inject(CaverJsModuleConfig.KEY)
        private readonly _config: ConfigType<typeof CaverJsModuleConfig>
    ) {}

    async getImageUrl(tokenId: number, type: string): Promise<string> {
        const httpProvider = new Caver.providers.HttpProvider(
            this._config.endpoint,
            this._config.options
        );
        const caver = new Caver(httpProvider);
        let ticketAddress = this._config.goldTicketTokenAddress;
        if (type === 'diamond') {
            ticketAddress = this._config.diamondTicketTokenAddress;
        }
        const contract = new caver.contract(
            [
                {
                    type: 'function',
                    constant: true,
                    inputs: [
                        {
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'imageUrl',
                    outputs: [
                        {
                            name: '',
                            type: 'string',
                        },
                    ],
                    payable: false,
                    stateMutability: 'view',
                },
            ],
            ticketAddress
        );
        const imageUrl = await contract.methods.imageUrl(tokenId);
        console.log(imageUrl);
        return imageUrl;
    }

    async getMetaData(tokenId: number, type: string): Promise<any[]> {
        const httpProvider = new Caver.providers.HttpProvider(
            this._config.endpoint,
            this._config.options
        );
        const caver = new Caver(httpProvider);
        let ticketAddress = this._config.goldTicketTokenAddress;
        if (type === 'diamond') {
            ticketAddress = this._config.diamondTicketTokenAddress;
        }
        const contract = new caver.contract(
            [
                {
                    constant: true,
                    inputs: [
                        {
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'property',
                    outputs: [
                        {
                            name: '',
                            type: 'string',
                        },
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                },
            ],
            ticketAddress
        );
        const strProperty = await contract.methods.property(tokenId);
        const parseProperty = JSON.parse(strProperty);
        return [parseProperty];
    }
}
