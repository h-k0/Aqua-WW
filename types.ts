
export enum UserRole {
  PLATFORM_ADMIN = 'PlatformAdmin',
  FACTORY_OWNER = 'FactoryOwner',
  FACTORY_ADMIN = 'FactoryAdmin',
  AGENT = 'Agent',
  DELIVERY_MAN = 'DeliveryMan',
  PUBLIC_CUSTOMER = 'PublicCustomer'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  factoryId?: string;
  agentId?: string;
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  ownerId: string;
  status: 'active' | 'suspended';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  factoryId: string;
  stock: number;
  emptyBottleStock: number;
}

export interface Order {
  id: string;
  customerId: string;
  agentId: string;
  factoryId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryDate: string;
  status: 'pending' | 'processing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  deliveryAddress: string;
  bottleReturns: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Agent {
  id: string;
  name: string;
  factoryId: string;
  township: string;
  commissionRate: number;
}

export interface PJP {
  id: string;
  deliveryManId: string;
  agentId: string;
  days: string[]; // ['Mon', 'Wed', 'Fri']
  outlets: string[]; // List of outlet IDs
}

export interface Outlet {
  id: string;
  name: string;
  code: string;
  address: string;
  ownerName: string;
  phone: string;
}

export interface ProductionBatch {
  id: string;
  factoryId: string;
  date: string;
  productId: string;
  quantity: number;
  status: 'draft' | 'confirmed' | 'completed';
}
