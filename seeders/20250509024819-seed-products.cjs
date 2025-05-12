'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Chaqueta acolchada repelente al agua Loose Fit',
        description: 'Chaqueta acolchada en tejido quilted, repelente al agua y cortavientos con motivo de texto bordado en el pecho. Modelo con cuello elevado, cierre delante, bolsillos laterales de ojal con botón de presión y un bolsillo interior con cierre. Elástico oculto en los puños y cordón de ajuste elástico con topes en la basta. Corte holgado para una silueta amplia pero no oversize. Forrada.',
        price: 79990,
        stock: 50,
        imageUrl: 'https://hmchile.vtexassets.com/arquivos/ids/6486507-483-725?v=638661228595270000&width=483&height=725&aspect=true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Polera con motivo estampado Loose Fit',
        description: 'Polera en punto de algodón de peso medio con motivo estampado. Modelo con cuello redondo ribeteado, hombros caídos y basta recta. Calce holgado para una silueta amplia pero no oversize.',
        price: 15500,
        stock: 200,
        imageUrl: 'https://hmchile.vtexassets.com/arquivos/ids/6518419-483-725?v=638681105754430000&width=483&height=725&aspect=true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Joggers de vestir Slim Fit',
        description: 'Joggers de vestir con raya cosida delante. Modelo con cierre decorativo, elástico revestido con cordón de ajuste en la cintura, bolsillos laterales y bolsillo trasero de ojal. Calce ajustado que realza el contorno del cuerpo creando una silueta entallada.',
        price: 25000,
        stock: 100,
        imageUrl: 'https://hmchile.vtexassets.com/arquivos/ids/6491818/Joggers-de-vestir-Slim-Fit---Crema---H-M-CL.jpg?v=638663817105930000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
