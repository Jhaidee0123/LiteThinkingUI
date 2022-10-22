import { Inventory } from "./inventory.model";

export interface Company {
	id: string;
  name: string;
  address: string;
  nit: number;
  phone: string;
  inventory: Inventory;
}
