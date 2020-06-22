'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProducerCompaniesSchema extends Schema {
  up () {
    this.create('producer_companies', (table) => {
      table.increments()
      table.integer('id_producer')
      .unsigned()
      .references('id')
      .inTable('producers')
      table.integer('id_company')
      .unsigned()
      .references('id')
      .inTable('companies')
      table.string('cod_producer', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('producer_companies')
  }
}

module.exports = ProducerCompaniesSchema
