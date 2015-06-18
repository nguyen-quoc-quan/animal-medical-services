json.array!(@medicine_specifications) do |medicine_specification|
  json.extract! medicine_specification, :id, :capacity, :medicine_specification_types_id
  json.url medicine_specification_url(medicine_specification, format: :json)
end
