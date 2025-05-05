import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-comment',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  commentId!: string; 
  content: string = '';

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.commentId = params['id'];
      this.commentService.getComment(this.commentId).subscribe(
        (data: any) => { 
          this.content = data.content;
        },
        (error: any) => { 
          console.error('Error fetching comment', error);
        }
      );
    });
  }

  updateComment() {
    const comment = { content: this.content, author: this.authService.currentUserValue.id };
    this.commentService.updateComment(this.commentId, comment).subscribe(
      (data: any) => {
        this.router.navigate(['/topics', data.topic]);
      },
      (error: any) => {
        console.error('Error updating comment', error);
      }
    );
  }
}