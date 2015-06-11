json.array!(@bill_details) do |bill_detail|
  json.extract! bill_detail, :id, :bill_id, :product_id, :quantity, :sale_price
  json.url bill_detail_url(bill_detail, format: :json)
end
