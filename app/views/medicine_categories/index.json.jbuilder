json.array!(@medicine_categories) do |medicine_category|
  json.extract! medicine_category, :id, :name
  json.url medicine_category_url(medicine_category, format: :json)
end
