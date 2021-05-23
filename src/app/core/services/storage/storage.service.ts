import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { StorageKey } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public async storeData<T>(key: StorageKey, data: T): Promise<void> {
    const valueAsString = JSON.stringify(data);
    await Plugins.Storage.set({ key, value: valueAsString });
  }

  public async retrieveData<T>(key: StorageKey): Promise<T | null> {
    const item = await Plugins.Storage.get({ key });
    return item.value === null ? null : JSON.parse(item.value);
  }

  public async removeData(key: StorageKey): Promise<void> {
    await Plugins.Storage.remove({ key });
  }

  public async clearStorage(): Promise<void> {
    await Plugins.Storage.clear();
  }
}
