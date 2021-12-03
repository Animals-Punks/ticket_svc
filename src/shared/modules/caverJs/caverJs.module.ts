import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CaverJsModuleConfig } from '@config';
import { CaverJsService } from '@shared/modules/caverJs/caverJs.service';

@Module({
    imports: [ConfigModule.forFeature(CaverJsModuleConfig)],
    providers: [
        {
            provide: 'CaverJsService',
            useClass: CaverJsService,
        },
    ],
    exports: ['CaverJsService'],
})
export class CaverJsModule {}
