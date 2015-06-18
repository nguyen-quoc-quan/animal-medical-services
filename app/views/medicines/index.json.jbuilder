json.array!(@medicines) do |medicine|
  json.extract! medicine, :id, :name, :description, :quantity, :medicine_specification_id, :medicine_category_id
  json.url medicine_url(medicine, format: :json)
end
