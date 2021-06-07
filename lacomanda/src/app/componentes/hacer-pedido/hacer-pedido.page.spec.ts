import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HacerPedidoPage } from './hacer-pedido.page';

describe('HacerPedidoPage', () => {
  let component: HacerPedidoPage;
  let fixture: ComponentFixture<HacerPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HacerPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
