json.array!(@products) do |product|
  json.extract! product, :id, :name, :description, :quantity, :product_specification_id, :product_category_id
  json.url product_url(product, format: :json)
end
