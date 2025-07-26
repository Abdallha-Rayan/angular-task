import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaSharedComponent } from './text-area-shared.component';

describe('TextAreaSharedComponent', () => {
  let component: TextAreaSharedComponent;
  let fixture: ComponentFixture<TextAreaSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAreaSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
