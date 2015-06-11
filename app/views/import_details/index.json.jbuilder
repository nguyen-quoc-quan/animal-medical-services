json.array!(@import_details) do |import_detail|
  json.extract! import_detail, :id, :import_id, :product_id, :quantity, :import_price
  json.url import_detail_url(import_detail, format: :json)
end
