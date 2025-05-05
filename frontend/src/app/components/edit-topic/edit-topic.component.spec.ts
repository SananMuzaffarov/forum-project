import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { EditTopicComponent } from './edit-topic.component';
import { TopicService } from '../../services/topic.service';

describe('EditTopicComponent', () => {
  let component: EditTopicComponent;
  let fixture: ComponentFixture<EditTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTopicComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [TopicService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
