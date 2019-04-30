import { TestBed } from '@angular/core/testing';

import { KobisOpenAPIRestService } from './kobis-open-apirest.service';

describe('KobisOpenAPIRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KobisOpenAPIRestService = TestBed.get(KobisOpenAPIRestService);
    expect(service).toBeTruthy();
  });
});
