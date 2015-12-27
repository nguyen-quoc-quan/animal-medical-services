class Product < ActiveRecord::Base
	require "paperclip/storage/ftp"
	belongs_to :product_type
	has_many :sale_details
	has_many :import_details
	belongs_to :product_category
	belongs_to :product_specification

	validates_presence_of :name, :description, :product_category, :product_specification

	has_attached_file :picture, {
    # Choose the FTP storage backend
    :storage => :ftp,

    # Set where to store the file on the FTP server(s).
    # This supports Paperclip::Interpolations.
    :path => "picture_management/public/upload/:attachment/:id/:style/:filename",

    # The full URL of where the attachment is publicly accessible.
    # This supports Paperclip::Interpolations.
    :url => "http://52.34.56.101/upload/:attachment/:id/:style/:filename",

    # The list of FTP servers to use
    :ftp_servers => [
      # {
      #   :host     => "ftp1.example.com",
      #   :user     => "foo",
      #   :password => "bar"
      # },
      # Add more servers if needed
      {
        :host     => "52.34.56.101",
        :user     => "ubuntu",
        :password => "thdtdnq123",
        :port     => 21, # optional, 21 by default
        :passive  => true  # optional, false by default
      }
    ],

    # Optional socket connect timeout (in seconds).
    # This only limits the connection phase, once connected
    # this option is of no more use.
    :ftp_connect_timeout => 5, # optional, nil by default (OS default timeout)

    # Optional flag to skip dead servers.
    # If set to true and the connection to a particular server cannot be
    # established, the connection error will be ignored and the files will
    # not be uploaded to that server.
    # If set to false and the connection to a particular server cannot be established,
    # a SystemCallError will be raised (Errno::ETIMEDOUT, Errno::ENETUNREACH, etc.).
    :ftp_ignore_failing_connections => true, # optional, false by default

    # Optional flag to keep empty parent directories when deleting files.
    :ftp_keep_empty_directories => true # optional, false by default
  }
  do_not_validate_attachment_file_type :picture
end
