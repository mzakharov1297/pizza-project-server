import {Catch, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {EntityNotFoundError, QueryFailedError, Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async getAll(): Promise<User[]> {
            return await this.userRepository.find()
    }

    async create(userData: CreateUserDto): Promise<CreateUserDto> {
        try {
            const user = this.userRepository.create(userData)
            return await this.userRepository.save(user)
        }catch (e) {
            throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
        }

    }
}
