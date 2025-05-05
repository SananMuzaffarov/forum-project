import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-topic',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {
  title: string = '';
  content: string = '';
  topicId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
    this.topicId = this.route.snapshot.paramMap.get('id') || '';
    if (this.topicId) {
      this.topicService.getTopic(this.topicId).subscribe(
        data => {
          this.title = data.title;
          this.content = data.content;
        },
        error => {
          console.error('Error fetching topic', error);
        }
      );
    }
  }

  updateTopic() {
    if (this.topicId) {
      const topic = { title: this.title, content: this.content };
      this.topicService.updateTopic(this.topicId, topic).subscribe(
        data => {
          this.router.navigate(['/topics']);
        },
        error => {
          console.error('Error updating topic', error);
        }
      );
    }
  }
}
