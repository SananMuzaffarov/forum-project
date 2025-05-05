import { TopicService } from '../../services/topic.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
//import { CommentService } from '../../services/comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations'; // Import animation functions

@Component({
  selector: 'app-topic-detail',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class TopicDetailComponent implements OnInit {
  topic: any = null; // Initialize topic as null
  topicId!: string; // Use non-null assertion operator

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public topicService: TopicService,
    private router: Router // Inject Router
  ) { }

  ngOnInit(): void {
    this.topicId = this.route.snapshot.paramMap.get('id')!;
    if (this.topicId) {
      this.topicService.getTopic(this.topicId).subscribe(
        data => {
          this.topic = data;
        },
        error => {
          console.error('Error fetching topic', error);
        }
      );
    }
  }

  goBack() {
    const currentUser = this.authService.currentUserValue;
    this.router.navigate(['/topics']); 
  }


  editTopic() {
    this.router.navigate(['/edit-topic', this.topicId]);
  }

  deleteTopic(topicId: string): void {
    this.topicService.deleteTopic(topicId).subscribe(
      () => {
        this.topic = this.topic.filter((topic: { _id: string; }) => topic._id !== topicId);
      },
      error => {
        console.error('Error deleting topic', error);
      }
    );
    this.router.navigate(['/topics'])
  }

  addComment() {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
    } else {
      console.log("User is logged in, allow adding comment.");
    }
  }


  
  isAuthor(author: any): boolean {
    console.log(author);
    const currentUser = this.authService.currentUserValue;

    const boobl = currentUser?.userId === author?._id

    return boobl;
  }
  
  isModerator(): boolean {
    
    const currentUser = this.authService.currentUserValue;
    const role = currentUser?.role;
    const boobl = currentUser && currentUser?.role === 'moderator'

    return boobl;
  }
}