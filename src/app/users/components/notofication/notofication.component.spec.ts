import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotoficationComponent } from './notofication.component';

describe('NotoficationComponent', () => {
  let component: NotoficationComponent;
  let fixture: ComponentFixture<NotoficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotoficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotoficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
