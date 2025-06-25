import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { MajorModule } from './major/major.module';
import { LevelModule } from './level/level.module';
import { SubMajorModule } from './sub-major/sub-major.module';
import { CourseModule } from './course/course.module';
import { MaterialModule } from './material/material.module';
import { DropboxService } from './dropbox/dropbox.service';
import { FciEventModule } from './fci-event/fci-event.module';
import { LectureTimeModule } from './lecture-time/lecture-time.module';
import { SectionTimeModule } from './section-time/section-time.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },

      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    MajorModule,
    LevelModule,
    SubMajorModule,
    CourseModule,
    MaterialModule,
    FciEventModule,
    LectureTimeModule,
    SectionTimeModule,
    MailModule],
  controllers: [AppController, UserController],
  providers: [AppService, DropboxService, MailService],
})
export class AppModule { }
