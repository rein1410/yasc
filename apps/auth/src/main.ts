import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

console.log(join(__dirname, '/proto/user.proto'));

async function bootstrap() {
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
  transport: Transport.GRPC,
  options: {
      package: 'user',
      protoPath: join(__dirname, '../../../proto/user.proto'),
    },
  });
  await app.listen();
}
bootstrap();
