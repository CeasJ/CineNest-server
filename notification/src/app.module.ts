import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from './src/mailer/mailer.module';
import { MailerModule } from './mailer/mailer.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [MailerModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
