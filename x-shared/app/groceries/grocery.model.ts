export class Grocery {
  constructor(
    public id: string,
    public name: string,
    public done: boolean = false,
    public deleted: boolean = false,
    public deleting: boolean = false,
    public createdAt: Date = null,
    public createdBy: string = null,
    public modifiedAt: Date = null,
    public modifiedBy: string = null,
    public owner: string = null
  ) {}
}