import { registerAs } from '@nestjs/config';
import { ticketAbi } from '../../../ticket-abi';

export default registerAs('caverJs', () => ({
    endpoint: process.env.CAVER_JS_END_POINT,
    tokenAddress: process.env.KIP17_ADDRESS,
    ticketAbi,
}));
