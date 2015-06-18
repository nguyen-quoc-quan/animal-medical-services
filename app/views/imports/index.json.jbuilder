json.array!(@imports) do |import|
  json.extract! import, :id, :import_at, :pay, :owe
  json.url import_url(import, format: :json)
end
