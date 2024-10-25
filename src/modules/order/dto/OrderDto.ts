import { CartItem } from '../../cart/entities/cart-item.entity';
import { OrderStatus } from '../../../consts/status-enum';

export class OrderDto {

  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  comment: string;
  totalAmount: number
  status: OrderStatus
  items: CartItem[]
}