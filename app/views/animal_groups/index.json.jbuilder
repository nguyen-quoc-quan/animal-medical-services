json.array!(@animal_groups) do |animal_group|
  json.extract! animal_group, :id, :customer_id, :quantity, :begin_date
  json.url animal_group_url(animal_group, format: :json)
end
