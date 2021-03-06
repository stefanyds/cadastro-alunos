module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('photos',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        aluno_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'students',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        originalname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('photos');
  },
};
