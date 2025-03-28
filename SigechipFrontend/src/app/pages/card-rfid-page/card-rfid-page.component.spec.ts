import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRfidPageComponent } from './card-rfid-page.component';

describe('CardRfidPageComponent', () => {
  let component: CardRfidPageComponent;
  let fixture: ComponentFixture<CardRfidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRfidPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRfidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
