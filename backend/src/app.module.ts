import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ResourcesModule } from './resources/resources.module';
import { SumModule } from './sum/sum.module';

@Module({
  imports: [PrismaModule, ResourcesModule, SumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
