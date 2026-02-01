import React from 'react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth-token';
import { orderService } from '@/modules/order/order.service';
import dbConnect from '@/lib/mongodb';
import { redirect } from 'next/navigation';
import OrdersClient from './OrdersClient';

export const dynamic = 'force-dynamic'; // Always SSR this page

const OrdersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login?from=/orders');
  }

  let userId = '';
  try {
    const payload = await verifyToken(token);
    userId = payload.userId;
  } catch (error) {
    redirect('/login?from=/orders');
  }

  await dbConnect();
  const orders = await orderService.getUserOrders(userId);

  // Serialize for Client Component
  const parsedOrders = JSON.parse(JSON.stringify(orders));

  return <OrdersClient initialOrders={parsedOrders} />;
};

export default OrdersPage;
