module ApplicationHelper
	def link_to_add_fields(name, f, association, type)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
    	if type
      	render(association.to_s.singularize, ff: builder, products_select: @foods_select, type: type)
      else
      	render(association.to_s.singularize, ff: builder, products_select: @medicines_select, type: type)
      end
    end
    link_to(name, '#', class: "add_fields btn btn-primary", data: {id: id, fields: fields.gsub("\n", "")})
  end
end
