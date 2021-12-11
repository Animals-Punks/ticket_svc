import { registerAs } from '@nestjs/config';

export default registerAs('caverJs', () => ({
    endpoint: process.env.CAVER_JS_END_POINT,
    goldTicketTokenAddress: process.env.GOLD_TICKET_ADDRESS,
    diamondTicketTokenAddress: process.env.DIAMOND_TICKET_ADDRESS,
    options: {
        headers: [
            {
                name: 'Authorization',
                value:
                    'Basic ' +
                    Buffer.from(
                        process.env.ACCESS_KEY_ID +
                            ':' +
                            process.env.SECRETE_ACCESS_KEY
                    ).toString('base64'),
            },
            { name: 'x-chain-id', value: process.env.CHAIN_ID },
        ],
    },
}));
