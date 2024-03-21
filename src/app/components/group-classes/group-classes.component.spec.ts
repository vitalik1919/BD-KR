import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupClassesComponent } from './group-classes.component';

describe('GroupClassesComponent', () => {
  let component: GroupClassesComponent;
  let fixture: ComponentFixture<GroupClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
