import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhongComponent } from './list-phong.component';

describe('ListPhongComponent', () => {
  let component: ListPhongComponent;
  let fixture: ComponentFixture<ListPhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
