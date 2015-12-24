# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email: "quan@gmail.com", password: "1qazxsw2", password_confirmation: "1qazxsw2")

ProductType.create(name: "Thuốc")
ProductType.create(name: "Thức ăn")
CapacityType.create(name: "Mililit", sign: "ml")
CapacityType.create(name: "Lit", sign: "l")
CapacityType.create(name: "Kilogam", sign: "kg")
CapacityType.create(name: "Gam", sign: "g")

user = User.find_by_email('quan@gmail.com')
user.update_attributes(first_name: "Quan", last_name: "Nguyen")