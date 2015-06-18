json.array!(@medicine_specification_types) do |medicine_specification_type|
  json.extract! medicine_specification_type, :id, :name
  json.url medicine_specification_type_url(medicine_specification_type, format: :json)
end
