json.array!(@foods) do |food|
  json.extract! food, :id, :name, :food_category_id, :food_type_id, :description
  json.url food_url(food, format: :json)
end
