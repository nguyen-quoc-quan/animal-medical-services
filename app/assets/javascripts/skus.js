//= require iCheck/icheck.min.js
//= require jeditable/jquery.jeditable.js
//= require dataTables/jquery.dataTables.js
//= require dataTables/dataTables.bootstrap.js
//= require dataTables/dataTables.responsive.js
//= require dataTables/dataTables.tableTools.min.js
//= require jqGrid/i18n/grid.locale-el.js
//= require jqGrid/jquery.jqGrid.min.js
//= require jquery-ui/jquery-ui.min.js
//= require datapicker/bootstrap-datepicker.js
var filter_export;
var Skus = {
  init: function(){
    this.loadData();
    this.add_datepicker();
    this.add_number();
  },

  loadData: function(){
    var self = this;
    var url = $('#skus-list').data('target');
    var brand_name = $('#skus-list').data('brand');
    var user_type = $('#skus-list').data('user');
    var table = $('#skus-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        "bProcessing": true,
        "iDisplayLength": 10,
         stateSave: true,
         "oLanguage": {
          "sSearchPlaceholder": "SKU",
        },
        "sDom": 'T<"clear">lfrtip',
        "oTableTools": {
          "aButtons": [
            {
              "sExtends":    "select",
              "sButtonText": "Export",
              "fnClick": function (nButton, oConfig, oFlash) {
                 self.export_file();
              }
          }]
        },
        "bInfo": true,

        "bServerSide": true,
        "autoWidth": false,
        "aoColumns": [
          {
            "sTitle": 'SKU',
            "bSortable": true,
            "sClass": "left",
            "mData": "part_number",
          },
          {
            "sTitle": 'Name',
            "bSortable": true,
            "sClass": "left ",
            "mData": "name"
          },
          {
            "sTitle": 'Quantity Available',
            "bSortable": true,
            "sClass": "left quantity",
            "mData": "quantity_available"
          },
          {
            "sTitle": 'Last Updated',
            "bSortable": false,
            "sClass": "left",
            "mData": "last_updated",
            "mRender": CommonFunction.format_date
          },
          {
            "sTitle": 'ETA',
            "bSortable": true,
            "sClass": "left",
            "mData": "eta",
            "mRender": self.render_eta
          }
          
        ],
        fnServerData: function( sUrl, aoData, fnCallback ) {
          tmp = aoData;
          aoData = CommonFunction.parseSkuFilterParams(aoData);
          draw = tmp[5];
          aoData.push({"name":"search", "value": draw.value.value});
          if(brand_name != ""){
            aoData.push({"name": "filter[brand_name]", "value": brand_name});
          }
          filter_export = aoData;
          // Search
          $.ajax({
            type: "GET",
            url: url,
            data: aoData,
            dataType: 'json',
            success: fnCallback
          })
        },
        fnDrawCallback: function(setting){
          if(user_type == 'BrandUser'){
            self.select_skus();
            self.edit_eta();
            self.edit_quantity();
          }
        }
    });
  },

  render_eta :function(data, type, full, meta ){
    var eta_class = "";
    var date = new Date();
    date.setHours(0,0,0,0);
    if(full.quantity_available > 0){
      eta_class = "action-lnk disable-link";
    }else if(data && new Date(data) < date){
      eta_class = "ui-datepicker-inline grey-out";
    }else{
      eta_class = "ui-datepicker-inline";
    }
   return "<a class='" + eta_class + "'>" + CommonFunction.format_date(data) +" </a>";
  },

  add_datepicker: function(){
    var self = this;
    $.editable.addInputType('datepicker', {
      element: function(settings, original) {
          var input = $('<input/>');
          $(this).append(input);
          return (input);
      },
      plugin: function(settings, original) {
          settings.onblur = 'ignore';
          $(this).find('input').datepicker({
              'autoclose': true,
              format: 'mm/dd/yyyy'
          });
      },
      content : function(string, settings, original) {
        if(string == "" || self.isValidDate(string)){
          $(':input:first', this).val(string);
        }else{
          $(':input:first', this).val(self.today);
          return false;
        }
      },
      reset : function(settings, original) {
        original.reset(this);
      },
    });
  },

  //MM/DD/YYYY
  isValidDate: function(s) {
    if(s != ''){
      var bits = s.split('/');
      var d = new Date(bits[2], bits[0] - 1, bits[1]);
      return d && (d.getMonth() + 1) == bits[0] && d.getDate() == Number(bits[1]);
    }else{
      return true;
    }
  },

  today: function(){
    date = new Date();
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
  },

  dateIsPast: function(Cdate){
    var today = new Date();
    today.setHours(0,0,0,0);
    date = new Date(Cdate);
    return date < today;
  },

  edit_eta: function(){
    var self= this;
    $('#skus-list td>a.ui-datepicker-inline').editable(function(value, settings) {
      var oTable = $('#skus-list').dataTable();
      var aPos = oTable.fnGetPosition($(this).parent()[0]);
      var column_name = oTable.fnSettings().aoColumns[aPos[1]].mData;
      var aoData = [];
      aoData.push({"name":"_id", "value": $('#skus-list').DataTable().row(aPos[0]).data()._id});
      aoData.push({"name":"column", "value": column_name});
      aoData.push({"name":"value", "value": value});
      $.ajax({
        type: "PUT",
        url: '/skus/update_sku',
        data: aoData,
        beforeSend: function(xhr) {
          if(self.isValidDate(value) == false){
            error_html = '<div class="alert alert-danger alert-dismissable">' +
              '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
              '<ul>'+
              '<li>Date is invalid</li>' +
              '</ul>' +
              '</div>'
          $('#alert-message').html(error_html);
          $('.ui-datepicker-inline input').datepicker('remove');
          return false;
          }
          else if(self.isValidDate(value) && self.dateIsPast(value)){
            error_html = '<div class="alert alert-danger alert-dismissable">' +
              '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
              '<ul>'+
              "<li>ETA can't be in the past</li>" +
              '</ul>' +
              '</div>'
            $('#alert-message').html(error_html);
            $('.ui-datepicker-inline input').datepicker('remove');
            return false;
          }
          else{
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
          }
        },
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
          
          oTable.fnStandingRedraw();
          
          
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#alert-message').html(error_html);}

      });
      }, {
          type: 'datepicker',
          indicator: 'Saving...',
          placeholder: 'Click to edit...',
          submit: 'OK',
          style: 'display: inline;',
          width: 'none',
          event: 'click'
      });
  },

  add_number: function(){
    $.editable.addInputType('number', {
      element: function(settings, original) {
          var input = $('<input/>');
          $(this).append(input);
          return (input);
      },
      content : function(string, settings, original) {
        if($.isNumeric(string) ==true && parseInt(string) < 0 || $.isNumeric(string) ==false  ){
          $(':input:first', this).val('');
        }else{
          $(':input:first', this).val(string);
        }
      },
      reset : function(settings, original) {
        original.reset(this);
      },
    });
  },
  edit_quantity: function(){
    $('#skus-list td.quantity').editable(function(value, settings) {
      var oTable = $('#skus-list').dataTable();
      var aPos = oTable.fnGetPosition(this);
      var column_name = oTable.fnSettings().aoColumns[aPos[1]].mData;
      var aoData = [];
      aoData.push({"name":"_id", "value": $('#skus-list').DataTable().row(aPos[0]).data()._id});
      aoData.push({"name":"column", "value": column_name});
      aoData.push({"name":"value", "value": value});
      //ajax
      $.ajax({
        type: "PUT",
        url: '/skus/update_sku',
        data: aoData,
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
        },
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
          $('#skus-list').dataTable().fnStandingRedraw();
        },
        error: function(data){
          error_html = '<div class="alert alert-danger alert-dismissable">' +
          '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
          '<ul>'+
          data.responseJSON.messages +
          '</ul>' +
          '</div>'
          $('#alert-message').html(error_html);
        }
      });//ajax end
    }, {
        type: 'number',
        indicator: 'Saving...',
        tooltip   : 'Please push Enter to submit your change!',
        event: 'click',
        submit: 'OK',
        style: 'display: inline;',
        width: 'none',
        cssclass : 'form-control'
    });
  },

  select_skus:function(){
    $('#skus-list tbody tr').click(function () {
        $(this).toggleClass('selected');
    } );
  },
  delete_skus:function(){
    $('#delete-skus-btn').click(function(){
      var sku_ids = [];
      $('#skus-list').DataTable().rows('.selected').data().each(function(row){
        sku_ids.push(row._id)
      });
      var answer = confirm ("Are you sure you want to delete " + sku_ids.length + " selected SKU(s)?");
      if (answer) {
        var params = [];
        params.push({"name":"sku_ids", "value":sku_ids});

        $.ajax({
                type: "DELETE",
                url: '/skus/id',
                beforeSend: function(xhr) {
                  xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                },
                data: params,
                dataType: 'json',
                success: function(){
                  $('#skus-list').DataTable().draw();
                }
        });
        }
    });
  },

  create_sku:function(){
    $('#create-sku').click(function(){
      $.ajax({
            type: "POST",
            url: '/skus',
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
            },
            data: $('#sku-form').serialize(),
            dataType: 'json',
            success: function(data){
              // $('#newSku').fadeOut('slow');
              $('#newSku').modal('hide');
              $('#sku-form')[0].reset();
              $('#new-sku-message').html('');
              success_msg = data.messages;
              success_html = '<div class="alert alert-success alert-dismissable">' +
              '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
              '<ul>'+
              success_msg +
              '</ul>' +
              '</div>' ;
              $('#alert-message').html(success_html);
              $('#skus-list').DataTable().draw();
            },
            error: function(data){
              error_html = '<div class="alert alert-danger alert-dismissable">' +
              '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
              '<ul>'+
              data.responseJSON.messages +
              '</ul>' +
              '</div>'
              $('#new-sku-message').html(error_html);}
    });
    });
  },
  export_file: function(){
    filter_export.push({"name":"file_type", "value": "SKU"});
    $.ajax({
      type: "POST",
      beforeSend: function(xhr) {
        $("body").addClass("loading");

        xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
      },
      url: '/exported_files',
      data: filter_export,
      dataType: 'json',
      success: function(data){
        $("body").removeClass("loading");
        file_path = data.file_url.replace("public/","");
        window.location = file_path;
      }
    });
  }
};

$(function(){
  Skus.init();
  $('#new-sku-eta').datepicker({format: 'mm/dd/yyyy', minDate: 0});
  Skus.delete_skus();
  Skus.create_sku();
});