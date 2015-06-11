json.array!(@bills) do |bill|
  json.extract! bill, :id, :customer_id, :sale_date, :pay, :owe
  json.url bill_url(bill, format: :json)
end
