import { TopicService } from '../../services/topic.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations'; // Import animation functions


@Component({
  selector: 'app-topic-list',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
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
export class TopicListComponent implements OnInit {
  topics: any[] = [];

  constructor(private topicService: TopicService, private router: Router) {}

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(
      data => {
        this.topics = data;
      },
      error => {
        console.error('Error fetching topics', error);
      }
    );
  }

  addTopic(): void {
    this.router.navigate(['/create-topic']);
  }
}