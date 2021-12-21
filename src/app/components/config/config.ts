export const configuration = {
  backend: {
    url: 'http://localhost:5000/api',
  },

  status_pedido: ['creado', 'entregado', 'cancelado'],

  opciones_producto: {
    masa: [
      {
        id: 1,
        tipo: 'Brioche Mantequilla',
        descripcion:
          'Aroma a mantequilla, color amarillo. Elaborado con mantequilla de vaca.',

        precio_base: 100,
        foto: 'assets/img/brioche.png',
      },
      {
        id: 2,
        tipo: 'Brioche Blanco',
        descripcion:
          'Aroma neutro, color blanco. Elaborado con margarina vegetal.',

        precio_base: 0,
        foto: 'assets/img/tipo_brioche.png',
      },
      {
        id: 3,
        tipo: 'Kaiser',
        descripcion:
          'Masa de sal esponjosa y resistente. Aliñada con finas hierbas y topping de queso.',

        precio_base: 0,
        foto: 'assets/img/kaiser.jpg',
      },
      {
        id: 4,
        tipo: 'Papa',
        descripcion:
          'Pan con un porcentaje de papa en su elaboración. Sabor y aroma a papa más un toque lácteo conferido por la mantequilla. Miga elástica, esponjosa y resistente, apropiada para absorber la humedad de las salsas.',

        precio_base: 0,
        foto: 'assets/img/pan-papa.jpg',
      },
    ],
    tipo_pan: [
      {
        id: 1,
        tipo: 'Hamburguesa',
        data: [
          {
            dim: '85 gramos - 10 cms (Tamaño estándar)',
            precio_base: 300,
            active: true,
          },
          { dim: '30 gramos - 5 cms', precio_base: 400, active: true },
          { dim: '60 gramos - 8 cms', precio_base: 500, active: true },
          { dim: '100 gramos - 12 cms', precio_base: 600, active: true },
        ],
      },
      {
        id: 2,
        tipo: 'Perro',
        data: [
          { dim: '10 cms- 40 gramos', precio_base: 400, active: true },
          { dim: '15cms - 60 gramos', precio_base: 500, active: true },
          { dim: '18 cms - 85 gramos', precio_base: 600, active: true },
          { dim: '20 cm - 100 gramos', precio_base: 700, active: true },
        ],
      },

      {
        id: 3,
        tipo: 'Sandwich',
        data: [
          { dim: '15 cms - 100 gramos', precio_base: 500, active: true },
          { dim: '20 cms - 120 gramos', precio_base: 600, active: true },
          { dim: '30 cms - 170 gramos', precio_base: 700, active: true },
        ],
      },
    ],
    tipo_pan_kaiser: [
      {
        id: 4,
        tipo: 'Hamburguesa',
        data: [{ dim: '90 gramos - 10 cm', precio_base: 400, active: true }],
      },
    ],
    tipo_pan_papa: [
      {
        id: 5,
        tipo: 'Hamburguesa',
        data: [{ dim: '85 gramos - 12 cm', precio_base: 400, active: true }],
      },
    ],
    topping: {
      hamb_brioche: [
        {
          top: 'Sin topping',
          foto: 'assets/img/landing2.jpg',
          precio_base: 0,
        },
        {
          top: 'Ajonjolí blanco',
          foto: 'assets/img/hamb-ajonjoli-blanco.png',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí negro',
          foto: 'assets/img/hamb-ajonjoli-negro.png',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí blanco y negro',
          foto: 'assets/img/hamb-ajonjoli-bn.png',
          precio_base: 100,
        },
      ],
      perro_blanco: [
        {
          top: 'Sin topping',
          foto: 'assets/img/landing3.jpg',
          precio_base: 0,
        },
        {
          top: 'Ajonjolí blanco',
          foto: 'assets/img/perro-ajonjoli-blanco.png',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí negro',
          foto: 'assets/img/perro-ajonjoli-negro.jpg',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí blanco y negro',
          foto: 'assets/img/perro-ajonjoli-bn.jpg',
          precio_base: 100,
        },
        {
          top: 'Finas hierbas y queso',
          foto: 'assets/img/perro-queso-hierbas.jpg',
          precio_base: 200,
        },
        {
          top: 'Orégano',
          foto: 'assets/img/perro-oregano.png',
          precio_base: 100,
        },
        {
          top: 'Orégano en la masa',
          foto: 'assets/img/perro-oregano-masa.jpg',
          precio_base: 100,
        },
      ],
      hamb_blanco: [
        {
          top: 'Sin topping',
          foto: 'assets/img/landing2.jpg',
          precio_base: 0,
        },
        {
          top: 'Ajonjolí blanco',
          foto: 'assets/img/hamb-ajonjoli-blanco.png',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí negro',
          foto: 'assets/img/hamb-ajonjoli-negro.png',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí blanco y negro',
          foto: 'assets/img/hamb-ajonjoli-bn.png',
          precio_base: 100,
        },
        {
          top: 'Finas hierbas y queso',
          foto: 'assets/img/hamb-queso-hierbas.jpg',
          precio_base: 200,
        },
        {
          top: 'Orégano',
          foto: 'assets/img/hamb-oregano.jpg',
          precio_base: 100,
        },
        {
          top: 'Orégano en la masa',
          foto: 'assets/img/hamb-oregano-masa.jpg',
          precio_base: 100,
        },
      ],
      perro_brioche: [
        {
          top: 'Sin topping',
          foto: 'assets/img/landing3.jpg',
          precio_base: 0,
        },
        {
          top: 'Ajonjolí blanco',
          foto: 'assets/img/perro-ajonjoli-blanco.png',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí negro',
          foto: 'assets/img/perro-ajonjoli-negro.jpg',
          precio_base: 100,
        },
        {
          top: 'Ajonjolí blanco y negro',
          foto: 'assets/img/perro-ajonjoli-bn.jpg',
          precio_base: 100,
        },
      ],
      sand_blanco: [
        {
          top: 'Sin topping',
          foto: 'assets/img/sandwich.png',
          precio_base: 0,
        },
        {
          top: 'Ajonjolí blanco',
          foto: 'assets/img/perro-ajonjoli-blanco.png',
          precio_base: 100,
        },
        {
          top: 'Finas hierbas y queso',
          foto: 'assets/img/perro-queso-hierbas.jpg',
          precio_base: 200,
        },
        {
          top: 'Orégano',
          foto: 'assets/img/sandwich-oregano.jpg',
          precio_base: 100,
        },
        {
          top: 'Orégano en la masa',
          foto: 'assets/img/perro-oregano-masa.jpg',
          precio_base: 100,
        },
      ],
      sand_brioche: [
        { top: 'Sin topping', foto: 'assets/img/sandwich.png', precio_base: 0 },
      ],
      kaiser: [{ top: 'Queso', foto: 'assets/img/kaiser.jpg', precio_base: 0 }],
      papa: [
        { top: 'Sin topping', foto: 'assets/img/pan-papa.jpg', precio_base: 0 },
      ],
    },
  },
};
