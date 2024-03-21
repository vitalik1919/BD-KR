import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerClassesComponent } from './trainer-classes.component';

describe('TrainerClassesComponent', () => {
  let component: TrainerClassesComponent;
  let fixture: ComponentFixture<TrainerClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
