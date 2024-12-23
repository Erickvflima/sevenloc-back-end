import { commonOptionsGenerate } from '@config/commonOptionsGenerate';
import { dataBaseList } from '@enums/dataBase';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entity/Log.log.entity';
import { LogService } from './log.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(commonOptionsGenerate(dataBaseList.sevenlocLog)),
    TypeOrmModule.forFeature([LogEntity]),
  ],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
