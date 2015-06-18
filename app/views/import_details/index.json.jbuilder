json.array!(@import_details) do |import_detail|
  json.extract! import_detail, :id, :quantity, :price, :importable_id, :importable_type, :import_id
  json.url import_detail_url(import_detail, format: :json)
end
