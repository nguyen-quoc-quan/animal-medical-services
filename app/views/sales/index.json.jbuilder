json.array!(@sales) do |sale|
  json.extract! sale, :id, :sale_at, :pay, :owe, :customer_id
  json.url sale_url(sale, format: :json)
end
