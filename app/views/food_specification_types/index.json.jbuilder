json.array!(@food_specification_types) do |food_specification_type|
  json.extract! food_specification_type, :id, :name
  json.url food_specification_type_url(food_specification_type, format: :json)
end
