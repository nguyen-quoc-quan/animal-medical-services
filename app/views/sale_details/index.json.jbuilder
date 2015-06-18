json.array!(@sale_details) do |sale_detail|
  json.extract! sale_detail, :id, :quantity, :price, :saleable_id, :saleable_type, :bill_id
  json.url sale_detail_url(sale_detail, format: :json)
end
