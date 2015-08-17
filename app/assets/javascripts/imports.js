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
    var self = this;
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
            "sTitle": 'Amount',
            "bSortable": false,
            "sClass": "left",
            "mData": "amount",
          },
          {
            "sTitle": 'Pay',
            "bSortable": false,
            "sClass": "left pay",
            "mData": "pay",
          },
          {
            "sTitle": 'Owe',
            "bSortable": false,
            "sClass": "left owe",
            "mData": "owed",
          },
           {
            "sTitle": 'Action',
            "bSortable": false,
            "sClass": "left",
            "mData": "id",
            "mRender": self.render_action
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
          self.do_action();
        }
    });
	},

  parse_data: function(aoData){
    var result = [];
    var tmp = aoData[2].value[0];
    if (tmp.column == 0) {
      result.push({"name": 'sort[date]', 'value': tmp.dir});
    }else if (tmp.column == 1) {
      result.push({"name": 'sort[customer_name]', 'value': tmp.dir});
    }else if (tmp.column == 2) {
      result.push({"name": 'sort[amount]', 'value': tmp.dir});
    }
    tmp = aoData[5].value
    result.push({"name": 'search_text', 'value': tmp.value});
    tmp = aoData[3]
    result.push({"name": 'start', 'value': tmp.value});
    tmp = aoData[4]
    result.push({"name": 'length', 'value': tmp.value});
    return result;
  },

  render_action: function(data, type, full, meta){
    view_btn = "<i class='fa fa-eye view-import' data-id = '"+data+"'></i>";
    delete_btn = "<i class='fa fa-times delete-import' data-id = '"+data+"'></i>"
    return "<div data-id = '"+data+"'>"+view_btn + delete_btn+"</div>";
  },

  do_action: function(){
    $(".view-import").click(function(){
      row = $(this).closest("tr");
      id = $(this).data('id');
      $.ajax({
        type: "get",
        dataType: 'json',
        url: "/imports/"+ id,
        success: function(data){
          console.log('OK');
          $('#custom-modal').html(data.attach).show();
          $('#view-import-detail').modal('show');
          $("#pay-import").click(function(){
            var url = $("#pay-form").attr('action');
            console.log(url);
            $.ajax({
              type: "PUT",
              url: url,
              beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
              },
              data: $('#pay-form').serialize(),
              dataType: 'json',
              success: function(data){
                success_msg = data.messages;
                success_html = '<div class="alert alert-success alert-dismissable">' +
                '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                '<ul>'+
                success_msg +
                '</ul>' +
                '</div>' ;
                $('#alert-message').html(success_html);
                row.find(".owe").text(data.owe);
                row.find(".pay").text(data.pay);
              },
              error: function(data){
                error_html = '<div class="alert alert-danger alert-dismissable">' +
                '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                '<ul>'+
                data.responseJSON.messages +
                '</ul>' +
                '</div>'
                $('#alert-message').html(error_html);
              },
              complete: function(data){
                $('#view-import-detail').modal('hide');
                $('#new-import-message').html('');
              }
            });
          });
          $('#view-import-detail').on('hidden.bs.modal', function (e) {
            $('#custom-modal').html("").hide();
          })
        },
        error: function(data){
          console.log('ERROR');
        }
      });
    });
    $(".delete-import").click(function(){
      console.log('delete');
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
          $('#alert-message').html('');
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
          $('#alert-message').html('');
          $('#alert-message').html(error_html);
        }
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