import Sequelize, { Model } from 'sequelize';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'originalname deve conter um valor válido para nome de arquivo.',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'filename deve conter um valor válido para nome de arquivo.',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'aluno_id' });
  }
}
