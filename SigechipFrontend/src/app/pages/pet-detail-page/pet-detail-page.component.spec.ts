import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailPageComponent } from './pet-detail-page.component';

describe('PetDetailPageComponent', () => {
  let component: PetDetailPageComponent;
  let fixture: ComponentFixture<PetDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
