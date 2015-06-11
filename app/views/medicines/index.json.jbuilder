json.array!(@medicines) do |medicine|
  json.extract! medicine, :id, :name, :medicine_category_id, :medicine_type_id, :description
  json.url medicine_url(medicine, format: :json)
end
