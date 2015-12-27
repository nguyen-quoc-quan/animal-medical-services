
var Product = {
	init: function(){
		this.load_list();
		this.create_product();
		this.create_product_specification();
		this.create_product_category();
		this.init_radio_create_specification();
    this.create_capacity_type();
	},
	load_list: function(){
    var self = this;
		var url = $('#products-list').data('target');
		var table = $('#products-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        // "bProcessing": true,
        "iDisplayLength": 10,
         // stateSave: true,
         "oLanguage": {
          "sSearchPlaceholder": "Tìm Kiếm",
        },
        "bInfo": true,

        "bServerSide": true,
        "autoWidth": false,
        "aoColumns": [
          {
            "sTitle": 'Hình',
            "bSortable": false,
            "sClass": "left",
            "mData": "picture",
            "mRender": self.render_picture
          },
          {
            "sTitle": 'Tên',
            "bSortable": true,
            "sClass": "left",
            "mData": "name",
          },
          {
            "sTitle": 'Loại',
            "bSortable": true,
            "sClass": "left",
            "mData": "product_type",
          },
          {
            "sTitle": 'Danh Mục',
            "bSortable": true,
            "sClass": "left",
            "mData": "category",
          },
          {
            "sTitle": 'Qui Cách',
            "bSortable": true,
            "sClass": "left",
            "mData": "type",
          },
          {
            "sTitle": 'Số Lượng',
            "bSortable": true,
            "sClass": "left",
            "mData": "quantity",
          }

        ],
        fnServerData: function( sUrl, aoData, fnCallback ) {
          aoData = self.parse_data(aoData);
          $.ajax({
            type: "GET",
            url: url,
            data: aoData,
            dataType: 'json',
            success: fnCallback
          })
        },
        fnDrawCallback: function(setting){
          // if(user_type == 'BrandUser'){
          //   self.select_skus();
          //   self.edit_eta();
          //   self.edit_quantity();
          // }
        }
    });
	},

  parse_data: function(aoData){
    var result = [];
    data = aoData[5].value;
    result.push({"name":"search_text", "value":data.value});
    data = aoData[2].value[0];
    if(data.column == 0){
      result.push({"name":"sort[name]", "value":data.dir});
    }else if(data.column == 1){
      result.push({"name":"sort[product_type_id]", "value":data.dir});
    }else if(data.column == 2){
      result.push({"name":"sort[product_category_id]", "value":data.dir});
    }else if(data.column == 3){
      result.push({"name":"sort[product_specification_id]", "value":data.dir});
    }else if(data.column == 4){
      result.push({"name":"sort[quantity]", "value":data.dir});
    }
    data = aoData[3];
    result.push({"name":"start", "value":data.value});
    data = aoData[4];
    result.push({"name":"length", "value":data.value});
    return result;
  },

  render_picture: function(data, type, full, meta){
    return '<img src="'+data+'" alt="picture" height="100" width="100">'
  },

	  create_product:function(){
    $('#product-form').submit(function(){
      // event.preventDefault();
      var formData = new FormData($(this)[0]);
      console.log("submit");
      $.ajax({
        type: "POST",
        url: '/products',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: formData,
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newProduct').modal('hide');
          $('#product-form')[0].reset();
          $('#new-product-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('#products-list').DataTable().draw();
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-product-message').html(error_html);}
    	});
  return false;
    });
  },
  create_product_specification:function(){
    $('#create-product-specification').click(function(){
      $.ajax({
        type: "POST",
        url: '/product_specifications',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#specification-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newSpecification').modal('hide');
          $('#specification-form')[0].reset();
          $('#new-product-specification-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('select#product_product_specification_id').prepend("<option value = '"+data.specification.id+"'>"+data.specification.name+"</option>");
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          console.log(error_html)
          $('#new-product-specification-message').html(error_html);
        }
    	});
    });
  },
  create_product_category:function(){
    $('#create-product-category').click(function(){
      $.ajax({
        type: "POST",
        url: '/product_categories',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#category-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newCategory').modal('hide');
          $('#category-form')[0].reset();
          $('#new-product-category-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('select#product_product_category_id').prepend("<option value = '"+data.category.id+"'>"+data.category.name+"</option>");
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-product-category-message').html(error_html);}
    	});
    });
  },

  create_capacity_type:function(){
    $('#create-capacity-type').click(function(){
      $.ajax({
        type: "POST",
        url: '/capacity_types',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#capacity-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newCapacityType').modal('hide');
          $('#capacity-form')[0].reset();
          $('#new-capacity-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('select#product_specification_capacity_type_id').prepend("<option value = '"+data.capacity_type.id+"'>"+data.capacity_type.name+"</option>");
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-capacity-message').html(error_html);}
      });
    });
  },
  init_radio_create_specification: function(){
  	$('#product_specification_product_specification_type_id').closest('.form-group').hide();
		$('#product_specification_product_specification_type_id').attr('disabled', 'disabled');
		$('.radio.i-checks input[type=radio]').on('ifChecked',function(){
			if($('.radio.i-checks input[name=specification]:checked').val() == "1"){
				$('#product_specification_product_specification_type_attributes_name').closest(".form-group").hide();
				$('#product_specification_product_specification_type_attributes_name').attr('disabled', 'disabled');
				$('#product_specification_product_specification_type_id').closest('.form-group').show();
				$('#product_specification_product_specification_type_id').removeAttr('disabled');
			}else{
				$('#product_specification_product_specification_type_id').closest('.form-group').hide();
				$('#product_specification_product_specification_type_id').attr('disabled', 'disabled');
				$('#product_specification_product_specification_type_attributes_name').closest(".form-group").show();
				$('#product_specification_product_specification_type_attributes_name').removeAttr('disabled');
			}
		});
  }
};

$(function(){
	Product.init();
	$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
	});
});
