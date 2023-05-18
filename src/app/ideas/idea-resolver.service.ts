import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Idea } from './models/idea.model';
import { Observable, of } from 'rxjs';
import { IdeasService } from './ideas.service';

@Injectable({
  providedIn: 'root'
})
export class IdeaResolverService implements Resolve<Idea> {

  constructor(private ideaService: IdeasService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Idea | Observable<Idea> | Promise<Idea> {
    const id = route.queryParamMap.get('id');
    if (!id) {
      return of(undefined as unknown as Idea);
    }
    return this.ideaService.getIdea(id);
  }

}
