import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { fastifyHelmet } from 'fastify-helmet';
import rateLimit from 'fastify-rate-limit';
import {
    initializeTransactionalContext,
    patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { AppModule } from '@src/app.module';
import { appConfig } from '@config';

initializeTransactionalContext();
patchTypeORMRepositoryWithBaseRepository();

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    try {
        app.enableCors();
        app.useGlobalPipes(
            new ValidationPipe({ validateCustomDecorators: true })
        );

        app.register(fastifyHelmet);

        app.register(rateLimit, {
            max: appConfig.rateLimitMax,
            timeWindow: '1 minute',
        });

        await app.listen(appConfig.port, '0.0.0.0');
        console.log(`Server is running ${appConfig.port}`);
    } catch (error) {
        throw new Error(`❌ Server running Error: ${error}`);
    }
}
bootstrap();
