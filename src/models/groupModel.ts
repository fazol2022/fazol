export default interface GroupModel {
  id: string;
  name?: string;
  expirationAt?: Date;
  priceTable: number;
  images?: string[];
  price?: number;
  quantity?: number;
  reference?: string;
  disabled?: boolean;
}
