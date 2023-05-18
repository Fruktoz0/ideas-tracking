import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrls: ['./list-ideas.component.scss']
})
export class ListIdeasComponent implements OnInit {
  ideas: Idea[] = [];
  id!: string;


  constructor(private ideasService: IdeasService, private router: Router) {}

  ngOnInit(): void{
      this.listIdeas();
  }

  deleteIdea(idea:Idea){
    this.ideasService.deleteIdea(idea).subscribe(_ => this.listIdeas());
  }

  editIdea(idea:Idea){
    this.router.navigateByUrl(`/ideas/new?id=${idea.id}`);
  }

  ideaByIdea(id: string){
    this.router.navigate(['ideas/idea', id]);
  }

  listIdeas(){
    this.ideasService.listIdeas().subscribe(ideas => this.ideas = ideas);
  }




}
