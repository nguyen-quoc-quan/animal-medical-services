//= require iCheck/icheck.min.js
//= require jeditable/jquery.jeditable.js
//= require dataTables/jquery.dataTables.js
//= require dataTables/dataTables.bootstrap.js
//= require dataTables/dataTables.responsive.js
//= require dataTables/dataTables.tableTools.min.js
//= require jqGrid/i18n/grid.locale-el.js
//= require jqGrid/jquery.jqGrid.min.js
//= require jquery-ui/jquery-ui.min.js
var Import = {
	init: function(){
		this.load_list();
		this.create_import();
	},
	load_list: function(){
		var url = $('#imports-list').data('target');
		var table = $('#imports-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        // "bProcessing": true,
        "iDisplayLength": 10,
         stateSave: true,
         "oLanguage": {
          "sSearchPlaceholder": "Hoa Don Nhap",
        },
        "bInfo": true,

        "bServerSide": true,
        "autoWidth": false,
        "aoColumns": [
          {
            "sTitle": 'Date',
            "bSortable": false,
            "sClass": "left",
            "mData": "date",
          },
          {
            "sTitle": 'Customer',
            "bSortable": false,
            "sClass": "left",
            "mData": "customer_name",
          },
          {
            "sTitle": 'Amount',
            "bSortable": false,
            "sClass": "left",
            "mData": "amount",
          },
          {
            "sTitle": 'Pay',
            "bSortable": false,
            "sClass": "left",
            "mData": "pay",
          },
          {
            "sTitle": 'Owe',
            "bSortable": false,
            "sClass": "left",
            "mData": "owed",
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

	create_import:function(){
    $('#create-import').click(function(){
      $.ajax({
        type: "POST",
        url: '/imports',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#import-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newMedicine').modal('hide');
          $('#import-form')[0].reset();
          $('#new-import-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('#import-list').DataTable().draw();
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-import-message').html(error_html);}
    	});
    });
  },

  add_product: function(){
  	$('.add_fields').click(function(e){
  		time = new Date().getTime();
  		regexp = new RegExp($(this).data('id'), 'g');
  		$(this).closest('form .modal-footer').before(($(this).data('fields').replace(regexp, time)));
  		e.preventDefault();
  	});
  }
};

$(function(){
	Import.init();
	Import.add_product();
	$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
	});
});