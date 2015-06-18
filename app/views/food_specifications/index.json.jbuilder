json.array!(@food_specifications) do |food_specification|
  json.extract! food_specification, :id, :capacity, :food_specification_types_id
  json.url food_specification_url(food_specification, format: :json)
end
