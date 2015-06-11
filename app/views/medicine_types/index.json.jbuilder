json.array!(@medicine_types) do |medicine_type|
  json.extract! medicine_type, :id, :name
  json.url medicine_type_url(medicine_type, format: :json)
end
