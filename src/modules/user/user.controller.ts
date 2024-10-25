import {Body, Catch, Controller, Get, Post, UsePipes} from '@nestjs/common';
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ValidationPipe} from "../../validation/validation.pipe";
import {QueryFailedError} from "typeorm";

@Controller('user')
export class UserController {
    constructor(readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAll()
    }

    @Post()
    async createUser(@Body(new ValidationPipe()) user:CreateUserDto ): Promise<CreateUserDto> {
        return this.userService.create(user)
    }
}
