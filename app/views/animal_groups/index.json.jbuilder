json.array!(@animal_groups) do |animal_group|
  json.extract! animal_group, :id, :quantity, :started_at, :customer_id
  json.url animal_group_url(animal_group, format: :json)
end
