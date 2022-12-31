import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhongComponent } from './update-phong.component';

describe('UpdatePhongComponent', () => {
  let component: UpdatePhongComponent;
  let fixture: ComponentFixture<UpdatePhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
