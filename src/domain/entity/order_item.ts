export class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;

    this.validate();
  }

  validate(): boolean {
    if (!this._name.length) {
      throw new Error("Name is required");
    }
    if (!this._price) {
      throw new Error("Price is required");
    }

    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    return true;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get productId(): string {
    return this._productId;
  }

  get id(): string {
    return this._id;
  }

  get total(): number {
    return this._price * this._quantity;
  }
}