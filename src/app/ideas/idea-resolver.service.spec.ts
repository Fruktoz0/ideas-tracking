import { TestBed } from '@angular/core/testing';

import { IdeaResolverService } from './idea-resolver.service';

describe('IdeaResolverService', () => {
  let service: IdeaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
