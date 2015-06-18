json.array!(@foods) do |food|
  json.extract! food, :id, :name, :description, :quantity, :food_specification_id, :food_category_id
  json.url food_url(food, format: :json)
end
