import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidoBartenderPage } from './pedido-bartender.page';

describe('PedidoBartenderPage', () => {
  let component: PedidoBartenderPage;
  let fixture: ComponentFixture<PedidoBartenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoBartenderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoBartenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
