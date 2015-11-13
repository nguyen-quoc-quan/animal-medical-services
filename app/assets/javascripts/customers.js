var Customer = {
	init: function(){
		this.load_list();
		this.create_customer();
	},
	load_list: function(){
		var url = $('#customers-list').data('target');
    var self = this;
		var table = $('#customers-list')
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
            "sTitle": 'Họ Tên',
            "bSortable": true,
            "sClass": "left full-name",
            "mData": "full_name",
          },
          {
            "sTitle": 'SĐT',
            "bSortable": true,
            "sClass": "left phone",
            "mData": "phone_number",
          },
          {
            "sTitle": 'Địa Chỉ',
            "bSortable": true,
            "sClass": "left address",
            "mData": "address",
          },
          {
            "sTitle": 'action',
            "bSortable": true,
            "sClass": "left",
            "mData": 'id',
            "mRender": self.render_action
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
          self.do_action();
        }
    });
	},

  render_action: function(data, type, full, meta ){
    edit_btn = "<i class='fa fa-pencil fa-2x edit-customer' data-id = '"+data+"'></i>";
    view_btn = "<a class= 'view-customer' href = '"+full.url+"'><i class = 'fa fa-2x fa-eye'></i></a>";
    return "<div data-id = '"+data+"'>"+edit_btn + view_btn+"</div>";
  },

    do_action: function(){
    $(".edit-customer").click(function(){
      var row = $(this).closest("tr");
      var id = $(this).data('id');
      $.ajax({
        type: "get",
        dataType: 'json',
        url: "/customers/"+ id + "/edit",
        success: function(data){
          console.log(data.attach);
          $('#custom-modal').html(data.attach).show();
          $('#view-customer-detail').modal('show');
          $("#update-customer").click(function(){
            var url = $("#customer-form").attr('action');
            console.log(url);
            $.ajax({
              type: "PUT",
              url: url,
              beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
              },
              data: $('#customer-form').serialize(),
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
                row.find(".full-name").text(data.full_name);
                row.find(".phone").text(data.phone);
                row.find(".address").text(data.address);
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
                $('#view-customer-detail').modal('hide');
                $('#new-customer-message').html('');
              }
            });
          });
          $('#view-customer-detail').on('hidden.bs.modal', function (e) {
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

	  create_customer:function(){
    $('#create-customer').click(function(){
      $.ajax({
        type: "POST",
        url: '/customers',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        },
        data: $('#customer-form').serialize(),
        dataType: 'json',
        success: function(data){
          // $('#newSku').fadeOut('slow');
          $('#newCustomer').modal('hide');
          $('#customer-form')[0].reset();
          $('#new-customer-message').html('');
          success_msg = data.messages;
          success_html = '<div class="alert alert-success alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          success_msg +
          '</ul>' +
          '</div>' ;
          $('#alert-message').html(success_html);
          $('#customers-list').DataTable().draw();
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"></button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#new-customer-message').html(error_html);}
    	});
    });
  }
};

$(function(){
	Customer.init();
	$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
	});
});