import React from 'react';

interface PayOrderProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

const PayOrder: React.FC<Readonly<PayOrderProps>> = ({
                                                       orderId,
                                                       totalAmount,
                                                       paymentUrl
                                                     }) => {
  return (
    <div>
      <h1>Заказ номер #{orderId}</h1>

      <p>Оплатите заказ на сумму {totalAmount} ₽. Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.</p>
    </div>
  );
};

export default PayOrder;