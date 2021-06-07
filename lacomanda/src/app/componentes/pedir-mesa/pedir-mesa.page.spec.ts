import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedirMesaPage } from './pedir-mesa.page';

describe('PedirMesaPage', () => {
  let component: PedirMesaPage;
  let fixture: ComponentFixture<PedirMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirMesaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedirMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
