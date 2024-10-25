import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/OrderDto';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  async createOrder(@Req() req: Request, @Body() data: OrderDto) {
    const token = req.cookies['cartToken'];

    if (!token) {
      return new HttpException('Error', HttpStatus.UNAUTHORIZED);
    }

    return this.orderService.create(data, token);
  }
}
