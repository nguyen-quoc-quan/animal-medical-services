json.array!(@imports) do |import|
  json.extract! import, :id, :import_date
  json.url import_url(import, format: :json)
end
