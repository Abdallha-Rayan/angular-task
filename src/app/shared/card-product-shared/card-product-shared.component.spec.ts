import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductSharedComponent } from './card-product-shared.component';

describe('CardProductSharedComponent', () => {
  let component: CardProductSharedComponent;
  let fixture: ComponentFixture<CardProductSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProductSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProductSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
