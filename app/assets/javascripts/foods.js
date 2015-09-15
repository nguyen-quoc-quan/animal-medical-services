var Food = {
	init: function(){
		this.load_list();
		this.create_food();
		this.create_food_specification();
		this.create_food_category();
		this.init_radio_create_specification();
	},
	load_list: function(){
		var url = $('#foods-list').data('target');
		var table = $('#foods-list')
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
            "sTitle": 'Tên',
            "bSortable": true,
            "sClass": "left",
            "mData": "name",
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
          // tmp = aoData;
          // aoData = CommonFunction.parseSkuFilterParams(aoData);
          // draw = tmp[5];
          // aoData.push({"name":"search", "value": draw.value.value});
          // if(brand_name != ""){
          //   aoData.push({"name": "filter[brand_name]", "value": brand_name});
          // }
          // filter_export = aoData;
          // // Search
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

	  create_food:function(){
    $('#create-food').click(function(){
      $.ajax({
        type: "POST",
        url: '/foods',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#food-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newFood').modal('hide');
          $('#food-form')[0].reset();
          $('#new-food-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('#foods-list').DataTable().draw();
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-food-message').html(error_html);}
    	});
    });
  },
  create_food_specification:function(){
    $('#create-food-specification').click(function(){
      $.ajax({
        type: "POST",
        url: '/food_specifications',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#specification-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newSpecification').modal('hide');
          $('#specification-form')[0].reset();
          $('#new-food-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('select#food_food_specification_id').prepend("<option value = '"+data.specification.id+"'>"+data.specification.name+"</option>");
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-food-message').html(error_html);}
    	});
    });
  },
  create_food_category:function(){
    $('#create-food-category').click(function(){
      $.ajax({
        type: "POST",
        url: '/food_categories',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#category-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newCategory').modal('hide');
          $('#category-form')[0].reset();
          $('#new-food-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('select#food_food_category_id').prepend("<option value = '"+data.category.id+"'>"+data.category.name+"</option>");
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-food-message').html(error_html);}
    	});
    });
  },
  init_radio_create_specification: function(){
  	$('#food_specification_food_specification_type_id').closest('.form-group').hide();
		$('#food_specification_food_specification_type_id').attr('disabled', 'disabled');
		$('.radio.i-checks input[type=radio]').on('ifChecked',function(){
			if($('.radio.i-checks input[name=specification]:checked').val() == "1"){
				$('#food_specification_food_specification_type_attributes_name').closest(".form-group").hide();
				$('#food_specification_food_specification_type_attributes_name').attr('disabled', 'disabled');
				$('#food_specification_food_specification_type_id').closest('.form-group').show();
				$('#food_specification_food_specification_type_id').removeAttr('disabled');
			}else{
				$('#food_specification_food_specification_type_id').closest('.form-group').hide();
				$('#food_specification_food_specification_type_id').attr('disabled', 'disabled');
				$('#food_specification_food_specification_type_attributes_name').closest(".form-group").show();
				$('#food_specification_food_specification_type_attributes_name').removeAttr('disabled');
			}
		});
  }
};

$(function(){
	Food.init();
	$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
	});
});