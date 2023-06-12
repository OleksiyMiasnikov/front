export class Certificate {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public duration: number,
    public createDate: string,
    public lastUpdateDate: string
  ) { }
}