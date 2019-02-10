import { TestBed, inject } from '@angular/core/testing';

import { BroatcastService } from './broatcast.service';

describe('BroatcastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroatcastService]
    });
  });

  it('should be created', inject([BroatcastService], (service: BroatcastService) => {
    expect(service).toBeTruthy();
  }));
});
