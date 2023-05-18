import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {
  idea?: Idea;
  ideas: Idea[] = [];

  constructor(private ideaService: IdeasService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadIdea(id);
    })
  }

  loadIdea(id: string) {
    this.ideaService.getIdea(id).subscribe(idea => this.idea = idea);
  }

  back() {
    this.router.navigateByUrl('');
  }

  listIdeas(){
    this.ideaService.listIdeas().subscribe(idea => this.ideas = idea);
  }

}
