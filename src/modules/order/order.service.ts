import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/OrderDto';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>,
    private readonly httpService: HttpService,
  ) {
  }

  async create(data: OrderDto, cartToken: string) {
    const userCart = await this.cartRepository.findOne({
      where: {
        token: cartToken,
      },
      relations: {
        user: true,
        cartItems: {
          ingredients: true,
          productItem: {
            product: true,
          },
        },
      },
    });

    if (!userCart) {
      throw new HttpException('User Cart not found', HttpStatus.NOT_FOUND);
    }

    if (userCart?.totalAmount === 0) {
      return new HttpException('Cart is Empty', HttpStatus.BAD_REQUEST);
    }

    let newOrder: Order = new Order();
    newOrder = {
      ...newOrder,
      ...data,
      items: userCart.cartItems,
      fullName: data.firstName + '' + data.lastName,
      token: cartToken,
    };

    await this.cartItemRepository.delete({ cart: userCart });
    userCart.totalAmount = 0;
    userCart.cartItems = [];
    await this.orderRepository.save(newOrder);
    await this.cartRepository.save(userCart);



    return { url: 'https://typeorm.io/', order: newOrder };
  }
}
