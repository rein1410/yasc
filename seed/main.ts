import { NestFactory } from '@nestjs/core';
import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class SeedingService {
  constructor() {}

  async seedDatabase() {
    console.log('Starting database seeding...');
    // await this.seedUsers();
    // await this.seedCalalog();
    console.log('Database seeding completed successfully');
  }

  // async seedUsers() {
  // }

  // async seedCatalog() {
  // }
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // Import your schema models here
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [SeedingService],
})
export class SeedingModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedingModule);
  const migrationService = app.get(SeedingService);
  try {
    await migrationService.seedDatabase();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
