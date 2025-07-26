import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordProductComponent } from './dashbord-product.component';

describe('DashbordProductComponent', () => {
  let component: DashbordProductComponent;
  let fixture: ComponentFixture<DashbordProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
