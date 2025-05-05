import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-comment',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})

export class CreateCommentComponent implements OnInit {
  topicId!: string; // Use non-null assertion operator
  content: string = '';

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.topicId = params['id']!;
    });
  }

  createComment() {
    const currentUser = this.authService.currentUserValue;
    const author = currentUser ? currentUser.id : 'user***';

    const comment = { content: this.content, author, topicId: this.topicId };
    this.commentService.createComment(this.topicId, comment).subscribe(
      data => {
        // Handle successful comment creation, e.g., clear the form
        this.content = '';
      },
      error => {
        console.error('Error creating comment', error);
      }
    );
  }
}