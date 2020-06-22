'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProducersSchema extends Schema {
  up () {
    this.create('producers', (table) => {
      table.increments()
      table.string('prod_name', 80).notNullable()
      table.string('prod_lname', 80).notNullable()
      table.string('prod_dni', 9).notNullable().unique()
      table.string('prod_email', 254).notNullable().unique()
      table.date('birthday').notNullable()
      table.string('registration', 15).notNullable().unique()
      table.string('celular_phone', 15).notNullable().unique()
      table.string('office_phone', 15)
      table.string('other_phone', 15)
      table.string('address', 100).notNullable()
      table.string('province', 20).notNullable()
      table.string('location', 15).notNullable()
      table.string('cp', 10).notNullable()
      table.boolean('locker').notNullable()
      table.string('other_job', 50)
      table.string('income', 80)
      table.string('sub_organizer', 80)
      table.string('executive', 80)
      table.string('note', 250)
      table.string('image', 250)
      table.timestamps()
    })
  }

  down () {
    this.drop('producers')
  }
}

module.exports = ProducersSchema
