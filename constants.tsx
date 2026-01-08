
import { UserRole, Factory, Product, Agent, User } from './types';

export const MOCK_FACTORIES: Factory[] = [
  { id: 'f1', name: 'Everest Springs', location: 'Industrial Zone 1', ownerId: 'u2', status: 'active' },
  { id: 'f2', name: 'Crystal Blue', location: 'East Riverside', ownerId: 'u2', status: 'active' }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: '20L Drinking Water', price: 2.50, factoryId: 'f1', stock: 1200, emptyBottleStock: 450 },
  { id: 'p2', name: '5L Refill Pack', price: 1.20, factoryId: 'f1', stock: 800, emptyBottleStock: 100 },
  { id: 'p3', name: '20L Drinking Water', price: 2.60, factoryId: 'f2', stock: 950, emptyBottleStock: 300 }
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Super Admin', email: 'admin@aquaflow.com', role: UserRole.PLATFORM_ADMIN },
  { id: 'u2', name: 'John Owner', email: 'john@everest.com', role: UserRole.FACTORY_OWNER, factoryId: 'f1' },
  { id: 'u3', name: 'Alice Agent', email: 'alice@agent.com', role: UserRole.AGENT, factoryId: 'f1', agentId: 'a1' },
  { id: 'u4', name: 'Mike Driver', email: 'mike@delivery.com', role: UserRole.DELIVERY_MAN, factoryId: 'f1' },
  { id: 'u5', name: 'Casual Bob', email: 'bob@gmail.com', role: UserRole.PUBLIC_CUSTOMER }
];

export const MOCK_AGENTS: Agent[] = [
  { id: 'a1', name: 'Alice Distribution', factoryId: 'f1', township: 'North District', commissionRate: 0.10 }
];
