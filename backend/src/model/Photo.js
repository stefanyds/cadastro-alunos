import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

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
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return (`${appConfig.url}/${appConfig.imagesFolder}/${this.getDataValue('filename')}`);
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
