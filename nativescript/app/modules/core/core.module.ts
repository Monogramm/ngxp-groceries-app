import { NgModule } from '@angular/core';

import { WorkerService, BackendService, StorageService } from '../../x-shared/app/core';

import { NativeWorkerService } from './native-worker.service';
import { NativeBackendService } from './native-backend.service';
import { ApplicationStorageService } from './application-storage.service';
import { LocalDatabaseService } from '../../x-shared/app/core/local-database.service';

@NgModule({
  providers: [
    NativeWorkerService,
    NativeBackendService,
    ApplicationStorageService,
    LocalDatabaseService,
    { provide: WorkerService, useExisting: NativeWorkerService },
    { provide: BackendService, useExisting: NativeBackendService },
    { provide: StorageService, useExisting: ApplicationStorageService }
  ],
})
export class CoreModule { }
