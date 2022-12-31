import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhongComponent } from './create-phong.component';

describe('CreatePhongComponent', () => {
  let component: CreatePhongComponent;
  let fixture: ComponentFixture<CreatePhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
