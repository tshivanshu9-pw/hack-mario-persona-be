import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { SaarthiModuleAdmin } from './modules/saarthi/saarthi.module';

const routes = [
  //admin routes
  {
    path: `v1/admin/saarthi/`,
    children: [
      {
        path: '/',
        module: SaarthiModuleAdmin,
      },
    ],
  },
];

@Module({
  imports: [CoreModule, SaarthiModuleAdmin],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
