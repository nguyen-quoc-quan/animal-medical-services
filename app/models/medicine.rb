class Medicine < ActiveRecord::Base
	has_many :bill_details, as: :billable
	has_many :import_details, as: :importable
	belongs_to :medicine_category
	belongs_to :medicine_type

	# def self.search(options)
 #    key_search = options[:search].to_s
 #    key_search.strip!
 #    skus = self.where(_id: /#{key_search}/i)
 #    skus = skus.where(options[:filter]) if options[:filter]
 #    skus
 #  end

 #  def self.my_sort(options = {})
 #    sort_criteria = options[:sort] || {}
 #    sort_criteria.map{|k,v| options[:sort][k] = v.to_i}
 #    sort_criteria = !sort_criteria.blank? ? sort_criteria : {"id" => :asc}
 #    self.order(sort_criteria)
 #  end
end
