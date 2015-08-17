//= require iCheck/icheck.min.js
//= require jeditable/jquery.jeditable.js
//= require dataTables/jquery.dataTables.js
//= require dataTables/dataTables.bootstrap.js
//= require dataTables/dataTables.responsive.js
//= require dataTables/dataTables.tableTools.min.js
//= require jqGrid/i18n/grid.locale-el.js
//= require jqGrid/jquery.jqGrid.min.js
//= require jquery-ui/jquery-ui.min.js
var Medicine = {
	init: function(){
		this.load_list();
		this.create_medicine();
		this.create_medicine_specification();
		this.create_medicine_category();
		this.init_radio_create_specification();
	},
	load_list: function(){
		var url = $('#medicines-list').data('target');
		var table = $('#medicines-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        // "bProcessing": true,
        "iDisplayLength": 10,
         stateSave: true,
         "oLanguage": {
          "sSearchPlaceholder": "Thuoc",
        },
        "bInfo": true,

        "bServerSide": true,
        "autoWidth": false,
        "aoColumns": [
          {
            "sTitle": 'Name',
            "bSortable": true,
            "sClass": "left",
            "mData": "name",
          },
          {
            "sTitle": 'Category',
            "bSortable": true,
            "sClass": "left",
            "mData": "category",
          },
          {
            "sTitle": 'Type',
            "bSortable": true,
            "sClass": "left",
            "mData": "type",
          },
          {
            "sTitle": 'Quantity',
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

	  create_medicine:function(){
    $('#create-medicine').click(function(){
      $.ajax({
        type: "POST",
        url: '/medicines',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#medicine-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newMedicine').modal('hide');
          $('#medicine-form')[0].reset();
          $('#new-medicine-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('#medicines-list').DataTable().draw();
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-medicine-message').html(error_html);}
    	});
    });
  },
  create_medicine_specification:function(){
    $('#create-medicine-specification').click(function(){
      $.ajax({
        type: "POST",
        url: '/medicine_specifications',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#specification-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newSpecification').modal('hide');
          $('#specification-form')[0].reset();
          $('#new-medicine-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('select#medicine_medicine_specification_id').prepend("<option value = '"+data.specification.id+"'>"+data.specification.name+"</option>");
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-medicine-message').html(error_html);}
    	});
    });
  },
  create_medicine_category:function(){
    $('#create-medicine-category').click(function(){
      $.ajax({
        type: "POST",
        url: '/medicine_categories',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#category-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newCategory').modal('hide');
          $('#category-form')[0].reset();
          $('#new-medicine-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('select#medicine_medicine_category_id').prepend("<option value = '"+data.category.id+"'>"+data.category.name+"</option>");
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-medicine-message').html(error_html);}
    	});
    });
  },
  init_radio_create_specification: function(){
  	$('#medicine_specification_medicine_specification_type_id').closest('.form-group').hide();
		$('#medicine_specification_medicine_specification_type_id').attr('disabled', 'disabled');
		$('.radio.i-checks input[type=radio]').on('ifChecked',function(){
			if($('.radio.i-checks input[name=specification]:checked').val() == "1"){
				$('#medicine_specification_medicine_specification_type_attributes_name').closest(".form-group").hide();
				$('#medicine_specification_medicine_specification_type_attributes_name').attr('disabled', 'disabled');
				$('#medicine_specification_medicine_specification_type_id').closest('.form-group').show();
				$('#medicine_specification_medicine_specification_type_id').removeAttr('disabled');
			}else{
				$('#medicine_specification_medicine_specification_type_id').closest('.form-group').hide();
				$('#medicine_specification_medicine_specification_type_id').attr('disabled', 'disabled');
				$('#medicine_specification_medicine_specification_type_attributes_name').closest(".form-group").show();
				$('#medicine_specification_medicine_specification_type_attributes_name').removeAttr('disabled');
			}
		});
  }
};

$(function(){
	Medicine.init();
	$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
	});
});