const { Model } = require('objection');
const knex = require('../config/db')
const User = require('./user')
const Product = require('./product')
Model.knex(knex);


class Order extends Model {
  static tableName = 'orders';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        price: { type: 'integer' },
        quantity: { type: 'integer' },
        product_id: { type: 'integer' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'orders.user_id',
        to: 'user.id'
      }
    },
    //has one product relation
    products: {
      relation: Model.HasOneRelation,
      modelClass: Product,
      join: {
        from: 'orders.product_id',
        to: 'products.id'
      }
    }
  };
}

module.exports = Order;
