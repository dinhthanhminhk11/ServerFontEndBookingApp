import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPageComponent } from './not-page.component';

describe('NotPageComponent', () => {
  let component: NotPageComponent;
  let fixture: ComponentFixture<NotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
