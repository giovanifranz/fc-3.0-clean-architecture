import { Address } from './address'

export class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active = true
  private _rewardPoints = 0

  constructor(id: string, name: string) {
    this._id = id
    this._name = name

    this.validate()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get address(): Address {
    return this._address
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  validate(): boolean {
    if (!this._id) {
      throw new Error('Id is required')
    }

    if (!this._name) {
      throw new Error('Name is required')
    }

    return true
  }

  changeName(name: string): void {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address): void {
    this._address = address
    this.validate()
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deActivate(): void {
    this._active = false
  }

  set address(address: Address) {
    this._address = address
  }

  isActive(): boolean {
    return this._active
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points
  }
}
