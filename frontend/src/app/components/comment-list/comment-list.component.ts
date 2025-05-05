import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  topicId!: string; 
  comments: any[] = [];

  constructor(private route: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.topicId = params['id'];
      this.loadComments();
    });
  }

  loadComments(): void {
    this.commentService.getComments(this.topicId).subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.error('Error fetching comments', error);
      }
    );
  }
}
