import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request, Response } from 'express';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {
  }

  @Get()
  async getCart(@Req() request: Request): Promise<Partial<Cart>> {
    let cookieValue: string | undefined = await request.cookies['cartToken'];
    return this.cartService.getUserCart(cookieValue);
  }

  @Patch(':id')
  async updateCart(@Req() request: Request, @Param() param: { id: number }, @Body() body: { quantity: number }) {
    const { id } = param;
    let cookieValue: string | undefined = await request.cookies['cartToken'];
    if (!cookieValue) {
      return new HttpException('Error', HttpStatus.BAD_REQUEST);
    }

    return await this.cartService.updateCartItem(cookieValue, id, body.quantity);
  }

  @Delete(':id')
  async deleteCartItem(@Req() request: Request, @Param() param: { id: number }) {
    const { id } = param;
    let cookieValue: string | undefined = await request.cookies['cartToken'];

    if (!cookieValue) {
      return new HttpException('Error', HttpStatus.BAD_REQUEST);
    }

    return this.cartService.deleteCartItem(cookieValue, id);
  }

  @Post()
  async addCartItem(@Req() request: Request, @Res() res: Response, @Body() body: { productId: number, ingredients: number[]}){
    let cookieValue: string | undefined = await request.cookies['cartToken'];

    if (!cookieValue) {
      cookieValue = crypto.randomUUID()
      res.cookie('cartToken', cookieValue, { httpOnly: true })
    }


    const userCart = await this.cartService.findOrCreateCart(cookieValue)
    const updatedCart = await this.cartService.findCartItem(userCart, body.productId, body.ingredients)

    return res.json(updatedCart);
  }
}
