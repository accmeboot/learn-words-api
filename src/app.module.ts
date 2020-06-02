import { HttpErrorFilter } from './shared/http-error.fiter';
import { LoggingInterceptor } from './shared/logging.interseptor';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { WordModule } from './word/word.module';
import { ListModule } from './list/list.module';
 
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    WordModule,
    ListModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
