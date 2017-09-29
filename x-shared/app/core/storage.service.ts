export abstract class StorageService {
  abstract getItem(key: string): any;
  abstract setItem(key: string, value: any): void;
  abstract removeItem(key: string): void;
}
