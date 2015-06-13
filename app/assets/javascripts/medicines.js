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
};

$(function(){
	Medicine.init();
});