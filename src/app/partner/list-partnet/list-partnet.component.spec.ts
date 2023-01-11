import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnetComponent } from './list-partnet.component';

describe('ListPartnetComponent', () => {
  let component: ListPartnetComponent;
  let fixture: ComponentFixture<ListPartnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartnetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
