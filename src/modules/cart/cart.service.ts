import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>,
  ) {
  }

  private async findCartAndItem(token: string | undefined, id: number): Promise<{ cart: Cart, cartItem: CartItem }> {
    const cart = await this.cartRepository.find({
      where: { token },
      relations: {
        cartItems: {
          ingredients: true,
          productItem: { product: true },
        },
      },
      order: {
        id: 'asc',
        cartItems: { createdAt: 'desc' },
      },
    });

    if (!cart || cart.length === 0) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }

    const cartItem = cart[0].cartItems.find(item => item.id === +id);
    if (!cartItem) {
      throw new HttpException('Cart item not found', HttpStatus.NOT_FOUND);
    }

    return { cart: cart[0], cartItem };
  }

  private calculateTotalAmount(cart: Cart): number {
    return cart.cartItems.reduce((acc, item) => {
      const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
      return acc + (ingredientsPrice + item.productItem.price) * item.quantity;
    }, 0);
  }

  async findCartItem(userCart: Cart, productItemId: number, ingredients: number[]) {
    let currentCartItem: CartItem;

    if (!ingredients || ingredients.length === 0) {
      currentCartItem = await this.cartItemRepository.findOne({
        where: {
          cart: { id: userCart.id },
          productItem: { id: productItemId },
          ingredients: [],
        },
      });
    } else {
      const queryBuilder = this.cartItemRepository.createQueryBuilder('cartItem')
        .leftJoinAndSelect('cartItem.ingredients', 'ingredient')
        .where('cartItem.cartId = :cartId', { cartId: userCart.id })
        .andWhere('cartItem.productItemId = :productItemId', { productItemId })
        .andWhere((qb) => {
          const subQuery = qb.subQuery()
            .select('cartItem.id')
            .from(CartItem, 'cartItem')
            .leftJoin('cartItem.ingredients', 'ingredient')
            .where('ingredient.id IN (:...ingredients)', { ingredients })
            .groupBy('cartItem.id')
            .having('COUNT(ingredient.id) = :ingredientsCount')
            .andHaving('COUNT(ingredient.id) = (SELECT COUNT(*) FROM "cart_items_Ingredients" WHERE "cartItemId" = cartItem.id)')
            .getQuery();
          return `cartItem.id IN ${subQuery}`;
        }, { ingredientsCount: ingredients.length });

      currentCartItem = await queryBuilder.getOne();
    }


    if (currentCartItem) {
      currentCartItem.quantity += 1;
      await this.cartItemRepository.save(currentCartItem);
    } else {
      const newCartItem = this.cartItemRepository.create({
        productItem: { id: productItemId },
        cart: { id: userCart.id },
        ingredients: ingredients.map(id => ({ id })),
        quantity: 1,
      });
      await this.cartItemRepository.save(newCartItem);
    }


    let newCart = await this.cartRepository.findOne({
      where: { id: userCart.id },
      relations: {
        cartItems: {
          ingredients: true,
          productItem: { product: true },
        },
      },
    });

    newCart.totalAmount = this.calculateTotalAmount(newCart);
    await this.cartRepository.save(newCart);
    return newCart;

  }

  async findOrCreateCart(token?: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { token },
      relations: {
        cartItems: {
          ingredients: true,
          productItem: { product: true },
        },
      },
      order: {
        id: 'asc',
        cartItems: { createdAt: 'desc' },
      },
    });

    if (!cart) {
      cart = this.cartRepository.create({
        token,
        totalAmount: 0,
        cartItems: [],
      });
      await this.cartRepository.save(cart);
    }
    return cart;
  }

  async deleteCartItem(token: string | undefined, id: number): Promise<Cart> {
    const { cart, cartItem } = await this.findCartAndItem(token, id);

    cart.cartItems = cart.cartItems.filter(item => item.id !== id);

    await this.cartItemRepository.remove(cartItem);
    let updatedCart = await this.cartRepository.findOne({
      where: { token },
      relations: {
        cartItems: {
          ingredients: true,
          productItem: { product: true },
        },
      },
      order: {
        id: 'asc',
        cartItems: { createdAt: 'desc' },
      },
    });
    updatedCart.totalAmount = this.calculateTotalAmount(updatedCart);
    await this.cartRepository.save(updatedCart);
    return updatedCart;
  }

  async updateCartItem(token: string | undefined, id: number, quantity: number): Promise<Partial<Cart>> {
    const { cart, cartItem } = await this.findCartAndItem(token, id);

    if (quantity) {
      cartItem.quantity = quantity;
      cart.totalAmount = this.calculateTotalAmount(cart);

      await this.cartItemRepository.save(cartItem);
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async getUserCart(token?: string): Promise<Partial<Cart>> {
    if (!token) {
      return { totalAmount: 0, cartItems: [] };
    }

    const currentCart = await this.cartRepository.find({
      where: { token },
      relations: {
        cartItems: {
          ingredients: true,
          productItem: { product: true },
        },
      },
      order: {
        id: 'asc',
        cartItems: { createdAt: 'desc' },
      },
      select: {
        cartItems: true,
        totalAmount: true,
        id: true,
      },
    });

    if (!currentCart || currentCart.length === 0) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }

    return currentCart[0];
  }
}