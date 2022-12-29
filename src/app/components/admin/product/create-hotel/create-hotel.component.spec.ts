import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHotelComponent } from './create-hotel.component';

describe('CreateHotelComponent', () => {
  let component: CreateHotelComponent;
  let fixture: ComponentFixture<CreateHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
