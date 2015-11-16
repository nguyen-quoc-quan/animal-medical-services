
var Sale = {
	init: function(){
		this.load_list();
		this.create_sale();
	},
	load_list: function(){
		var url = $('#sales-list').data('target');
		var self = this;
		var table = $('#sales-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        // "bProcessing": true,
        "iDisplayLength": 10,
         // stateSave: true,
         "oLanguage": {
          "sSearchPlaceholder": "Search",
        },
        "bInfo": true,

        "bServerSide": true,
        "autoWidth": false,
        "aoColumns": [
          {
            "sTitle": 'Ngày',
            "bSortable": true,
            "sClass": "left",
            "mData": "date",
          },
          {
            "sTitle": 'Khách Hàng',
            "bSortable": true,
            "sClass": "left",
            "mData": "customer_name",
          },
          {
            "sTitle": 'Tổng',
            "bSortable": false,
            "sClass": "left",
            "mData": "amount",
          },
          {
            "sTitle": 'Đã Trả',
            "bSortable": false,
            "sClass": "left pay",
            "mData": "pay",
          },
          {
            "sTitle": 'Nợ',
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
          date_from = $("#date-from").val()
          date_to = $("#date-to").val()
          aoData.push({"name": "date_from", "value": date_from})
          aoData.push({"name": "date_to", "value": date_to})
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
			result.push({"name": 'sort[sale_at]', 'value': tmp.dir});
		}else if (tmp.column == 1) {
			result.push({"name": 'sort[full_name]', 'value': tmp.dir});
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
		view_btn = "<i class='fa fa-eye fa-2x view-sale' data-id = '"+data+"'></i>";
		return "<div data-id = '"+data+"'>"+view_btn+"</div>";
	},

	do_action: function(){
		$(".view-sale").click(function(){
			row = $(this).closest("tr");
			id = $(this).data('id');
			$.ajax({
				type: "get",
				dataType: 'json',
				url: "/sales/"+ id,
				success: function(data){
					$('#custom-modal').html(data.attach).show();
					$('#view-sale-detail').modal('show');
					$("#pay-sale").click(function(){
						var url = $("#pay-form").attr('action');
						console.log(url);
						$.ajax({
			        type: "post",
			        url: url,
			        beforeSend: function(xhr) {
			          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
			        },
			        data: $('#pay-form').serialize(),
			        dataType: 'json',
			        success: function(data){
			          success_msg = data.messages;
			          success_html = '<div class="alert alert-success alert-dismissable">' +
			          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
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
			          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
			          '<ul>'+
			          data.responseJSON.messages +
			          '</ul>' +
			          '</div>'
			          $('#alert-message').html(error_html);
			        },
			        complete: function(data){
			        	$('#view-sale-detail').modal('hide');
			          $('#new-sale-message').html('');
			        }
			    	});
					});
					$('#view-sale-detail').on('hidden.bs.modal', function (e) {
					  $('#custom-modal').html("").hide();
					})
				},
				error: function(data){
					console.log('ERROR');
				}
			});
		});
		$(".delete-sale").click(function(){
			console.log('delete');
		});
	},

	create_sale:function(){
    $('#create-sale').click(function(){
      $.ajax({
        type: "POST",
        url: '/sales',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#sale-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newproduct').modal('hide');
          $('#sale-form')[0].reset();
          $('#alert-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('#sale-list').DataTable().draw();
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>';
          $('#alert-message').html('');
          $('#alert-message').html(error_html);}
    	});
    });
  },

  add_product: function(){
    self = this;
  	$('.add_fields').click(function(e){
  		time = new Date().getTime();
  		regexp = new RegExp($(this).data('id'), 'g');
  		$(this).closest('form .modal-footer').before(($(this).data('fields').replace(regexp, time)));
  		e.preventDefault();
      self.remove_product();
      $(this).closest('form').find('.well').last().find('select').select2({ width: 'off' });
  	});
  },

  remove_product: function(){
    $('.remove-product').click(function(){
      $(this).closest(".well").remove();
    });
  }
};

$(function(){
	Sale.init();
	Sale.add_product();
  $('#sale_sale_at').datepicker({
      autoclose: true,
      todayHighlight: true,
      format: "dd-mm-yyyy"
    }).datepicker("setDate", new Date());
  $('#date-from').datepicker({
      autoclose: true,
      todayHighlight: true,
      format: "dd-mm-yyyy"
    });
  $('#date-to').datepicker({
      autoclose: true,
      todayHighlight: true,
      format: "dd-mm-yyyy"
    });

	$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
	});

  $("#sale_customer_id").select2();

  $("#filter-btn").click(function(){
    $('#sales-list').DataTable().draw();
  });
  $("#clear-filter-btn").click(function(){
    $("#date-from, #date-to").val('');
    $('#sales-list').DataTable().draw();
  });
});