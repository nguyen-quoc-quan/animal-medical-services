# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150610020758) do

  create_table "animal_groups", force: true do |t|
    t.integer  "customer_id"
    t.integer  "quantity",    default: 0
    t.date     "begin_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bill_details", force: true do |t|
    t.integer  "bill_id"
    t.integer  "product_id"
    t.integer  "quantity",                              default: 0
    t.decimal  "sale_price",    precision: 9, scale: 2, default: 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "billable_id"
    t.string   "billable_type"
  end

  create_table "bills", force: true do |t|
    t.integer  "customer_id"
    t.date     "sale_date"
    t.decimal  "pay",         precision: 9, scale: 2, default: 0.0
    t.decimal  "owe",         precision: 9, scale: 2, default: 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "customers", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "address"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "food_categories", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "food_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "foods", force: true do |t|
    t.string   "name"
    t.integer  "food_category_id"
    t.integer  "food_type_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "import_details", force: true do |t|
    t.integer  "import_id"
    t.integer  "product_id"
    t.integer  "quantity",                                default: 0
    t.decimal  "import_price",    precision: 9, scale: 2, default: 0.0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "importable_id"
    t.string   "importable_type"
  end

  create_table "imports", force: true do |t|
    t.date     "import_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medicine_categories", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medicine_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medicines", force: true do |t|
    t.string   "name"
    t.integer  "medicine_category_id"
    t.integer  "medicine_type_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
