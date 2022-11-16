import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListorderComponent } from './listorder.component';

describe('ListorderComponent', () => {
  let component: ListorderComponent;
  let fixture: ComponentFixture<ListorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
