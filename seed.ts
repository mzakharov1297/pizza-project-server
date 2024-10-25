import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './src/app.module';
import {createSeeds} from "./src/modules/seeds/create-seeds";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    await createSeeds(dataSource);
    await app.close();
}


bootstrap().catch(err => console.error(err));