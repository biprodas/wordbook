import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from '../configs';
import { configValidationSchema } from '../configs/config-validation.schema';
import { JobsModule } from '../job/jobs.module';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { TaskModule } from '@modules/task/task.module';
import { DatabaseModule } from 'src/database/database.module';
import { DictionaryModule } from '@modules/dictionary/dictionary.module';
import { WordModule } from '@modules/word/word.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      // envFilePath: ['.env'],
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    DatabaseModule,
    // CommonModule,
    DictionaryModule,
    WordModule,
    TaskModule,
    JobsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
