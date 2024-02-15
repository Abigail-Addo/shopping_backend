const { Model } = require('objection');
const knex = require('../config/db')
const Order = require('./order')


Model.knex(knex);

class User extends Model {
    static tableName = 'users';


    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                picture: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        };
    }

    static relationMappings = {
        owner: {
            relation: Model.HasManyRelation,
            modelClass: Order,
            join: {
                from: 'user.id',
                to: 'orders.user_id'
            }
        }
    };


}

module.exports = User;