import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaMesasPage } from './lista-mesas.page';

describe('ListaMesasPage', () => {
  let component: ListaMesasPage;
  let fixture: ComponentFixture<ListaMesasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMesasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
