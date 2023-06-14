export class CertificateWithTags {
  constructor(
    public id: number = 0,
    public name: string = '',
    public tags: string[] = [],
    public description: string = '',
    public price: number = 0,
    public duration: number = 0,
    public createDate: string = '',
    public lastUpdateDate: string = ''
  ) { }
}
