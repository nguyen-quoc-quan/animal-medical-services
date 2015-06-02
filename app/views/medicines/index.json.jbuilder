json.array!(@medicines) do |medicine|
  json.extract! medicine, :id, :name, :quality, :org_price, :sale_price
  json.url medicine_url(medicine, format: :json)
end
