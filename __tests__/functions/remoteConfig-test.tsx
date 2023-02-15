/**
 * @format
 */

import 'react-native';
import { getStatusModuleFather } from 'utils/modulesApp';

describe('test scan CodeBarFunction', () => {
  const json = [
    {
      id: 'billing',
      name: 'Facturación',
      enabled: true,
      modules: [
        { id: 'seven_eleven', name: 'Facturación 7-Eleven', description: 'Facturación e historial de facturas 7-Eleven', enabled: false },
        { id: 'petro_seven', name: 'Facturación Petro Seven', description: 'Facturación e historial de facturas Petro Seven', enabled: true }
      ]
    },
    {
      id: 'my_wallet',
      name: 'My Wallet',
      enabled: true,
      modules: [
        { id: 'my_wallet_points_card', name: 'Tarjetas de puntos', description: 'ICONN preferente y tarjeta Payback', enabled: false },
        { id: 'my_wallet_deposit', name: 'Depósitos', description: 'Deposito a tarjetas y cuentas bancarias', enabled: true },
        { id: 'my_wallet_send_money', name: 'Envios y Cobro de dinero', description: 'Envios y cobros de dinero nacional', enabled: false },
        { id: 'my_wallet_charge', name: 'Cobro de remesas', description: 'Cobro de remesas provenientes  de Estados Unidos', enabled: false }
      ]
    },
    {
      id: 'services',
      name: 'Servicios',
      enabled: true,
      modules: [
        { id: 'services_pay', name: 'Pago de servicios', description: 'Descripción', enabled: false },
        { id: 'time_refills', name: 'Recargas de Tiempo Aire', description: 'Recargas para celular, individuales o generalizadas', enabled: true },
        { id: 'transportation_refills', name: 'Recargas de Transporte', description: 'Descripción', enabled: false },
        { id: 'gift_cards', name: 'Tarjetas de regalo', description: 'Descripción', enabled: true },
        { id: 'digital_products', name: 'Productos digitales', description: 'Descripción', enabled: true },
        { id: 'category_tracking', name: 'Rastreo de categorias', description: 'Servicio de rastreo de Estafeta', enabled: false }
      ]
    },
    {
      id: 'geolocation',
      name: 'Geolocalización',
      enabled: true,
      modules: [
        { id: 'seven_eleven_stores_location', name: 'Ubicaciones de tiendas 7-Eleven', description: '', enabled: false },
        { id: 'petro_seven_stores_location', name: 'Ubicaciones de estaciones Petro Seven', description: '', enabled: true }
      ]
    },
    {
      id: 'help_center',
      name: 'Centro de ayuda',
      enabled: true,
      modules: [
        { id: 'frequent_questions', name: 'Preguntas frecuentes', description: 'Descripcion de funcionalidad', enabled: false },
        { id: 'welcome_tour', name: 'Tour de bienvenida', description: 'Volver a ver el tour de bienvenida', enabled: true },
        { id: 'contact_information', name: 'Datos de contacto', description: 'Descripción de funcionalidad', enabled: false }
      ]
    }
  ];
  it('modulo inexistente', () => {
    const result = getStatusModuleFather(json, 'na');
    expect(result).toBeUndefined();
  });
  it('modulo existente', () => {
    const result = getStatusModuleFather(json, 'my_wallet');
    expect(typeof result === 'boolean').toBeTruthy();
  });
});
