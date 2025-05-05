import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { EditCommentComponent } from './edit-comment.component';
import { CommentService } from '../../services/comment.service';

describe('EditCommentComponent', () => {
  let component: EditCommentComponent;
  let fixture: ComponentFixture<EditCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCommentComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [CommentService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
