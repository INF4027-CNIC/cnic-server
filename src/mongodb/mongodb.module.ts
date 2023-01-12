import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class MongodbModule {
  static configService: ConfigService = new ConfigService();

  static forRoot(): DynamicModule {
    return {
      module: MongodbModule,
      imports: [
        MongooseModule.forRoot(MongodbModule.configService.get('MONGO_URI')),
      ],
    };
  }
}
