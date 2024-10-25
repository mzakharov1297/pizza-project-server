import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from './modules/user/user.module';
import {ProductModule} from './modules/product/product.module';
import {CategoryModule} from './modules/category/category.module';
import {IngredientModule} from './modules/ingredient/ingredient.module';
import {CartService} from './modules/cart/cart.service';
import {CartController} from './modules/cart/cart.controller';
import {CartModule} from './modules/cart/cart.module';
import {OrderModule} from './modules/order/order.module';
import {VerificationCodeService} from './modules/verification-code/verification-code.service';
import {VerificationCodeModule} from './modules/verification-code/verification-code.module';
import {DataSource} from "typeorm";
import { ResendEmailModule } from './modules/resend-email/email.module';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USERNAME"),
            password: configService.get("DB_PASSWORD"),
            database: configService.get("DB_NAME"),
            entities: [
                __dirname + '/**/*.entity{.ts,.js}',
            ],
            migrations: [__dirname + "/migrations/*{.ts,.js}"],
            synchronize: true,
        }),
        inject: [ConfigService],

    }), UserModule, ProductModule, CategoryModule, IngredientModule, CartModule, OrderModule, VerificationCodeModule,ResendEmailModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
