import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cat, CatSchema } from './cat.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const uri = configService.get<string>('MONGO_URI');
        return {
          uri
        };
      },

      inject: [ConfigService]
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
