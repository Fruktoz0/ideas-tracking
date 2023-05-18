import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IdeasService } from '../ideas.service';
import { Idea } from '../models/idea.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {
  @Input() idea!: Idea;
  @Output() voteUpdate: EventEmitter<void> = new EventEmitter<void>();
  @Output() downUpdate: EventEmitter<void> = new EventEmitter<void>();

  constructor(private ideasService: IdeasService) { }


  upvoteIdea() {
    this.ideasService.upvoteIdea(this.idea).subscribe(() => {
      this.voteUpdate.emit();
    });
  }

  downvoteIdea() {
    this.ideasService.downvoteIdea(this.idea).subscribe(() => {
      this.downUpdate.emit();
    });
  }

  


}
