import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Caver from 'caver-js';
import { KIP17 } from 'caver-js/types/packages/caver-kct/src/kip17';

import {
    ICaverJsService,
    MintTicketInput,
} from '@shared/interfaces/caverJs/caverJs.interface';
import { CaverJsModuleConfig } from '@config';

@Injectable()
export class CaverJsService implements ICaverJsService {
    caver: Caver;
    kip17Instance: KIP17;

    constructor(
        @Inject(CaverJsModuleConfig.KEY)
        private readonly _config: ConfigType<typeof CaverJsModuleConfig>
    ) {
        this.caver = new Caver(_config.endpoint);
        this.kip17Instance = new this.caver.klay.KIP17(_config.tokenAddress);
    }

    async getImageUrl(tokenId: number): Promise<string> {
        const contract = new this.caver.contract(
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
            this._config.tokenAddress
        );
        const imageUrl = await contract.methods.imageUrl(tokenId);
        return imageUrl;
    }

    async getMetaData(tokenId: number): Promise<any[]> {
        const contract = new this.caver.contract(
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
            this._config.tokenAddress
        );
        const strProperty = await contract.methods.property(tokenId);
        const parseProperty = JSON.parse(strProperty);
        return [parseProperty];
    }

    async mintTicket(mintTicketInput: MintTicketInput): Promise<boolean> {
        const contract = new this.caver.contract(
            [
                {
                    constant: false,
                    inputs: [
                        {
                            name: 'to',
                            type: 'address',
                        },
                        {
                            name: 'metadata',
                            type: 'string',
                        },
                        {
                            name: 'imageUri',
                            type: 'string',
                        },
                    ],
                    name: 'mintWithMetadata',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
            ],
            this._config.tokenAddress
        );
        try {
            contract.methods.mintWithMetadata(
                mintTicketInput.mintAddress,
                mintTicketInput.property,
                mintTicketInput.imageUrl
            );
            return true;
        } catch (error) {
            return false;
        }
    }
}
