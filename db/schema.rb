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

ActiveRecord::Schema.define(version: 20150727130851) do

  create_table "animal_groups", force: true do |t|
    t.integer  "quantity",    default: 0
    t.date     "started_at"
    t.integer  "customer_id"
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

  create_table "food_specification_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "food_specifications", force: true do |t|
    t.float    "capacity",                   limit: 24, default: 0.0
    t.integer  "food_specification_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "foods", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "quantity",              default: 0
    t.integer  "food_specification_id"
    t.integer  "food_category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "import_details", force: true do |t|
    t.integer  "quantity",        default: 0
    t.integer  "price",           default: 0
    t.integer  "importable_id"
    t.string   "importable_type"
    t.integer  "import_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "imports", force: true do |t|
    t.date     "import_at"
    t.integer  "pay",        default: 0
    t.integer  "owe",        default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medicine_categories", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medicine_specification_types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medicine_specifications", force: true do |t|
    t.float    "capacity",                       limit: 24, default: 0.0
    t.integer  "medicine_specification_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medicines", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "quantity",                  default: 0
    t.integer  "medicine_specification_id"
    t.integer  "medicine_category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sale_details", force: true do |t|
    t.integer  "quantity",      default: 0
    t.integer  "price",         default: 0
    t.integer  "saleable_id"
    t.string   "saleable_type"
    t.integer  "sale_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sales", force: true do |t|
    t.date     "sale_at"
    t.integer  "pay",         default: 0
    t.integer  "owe",         default: 0
    t.integer  "customer_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "password_digest"
    t.boolean  "status"
    t.string   "avatar"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
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
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
