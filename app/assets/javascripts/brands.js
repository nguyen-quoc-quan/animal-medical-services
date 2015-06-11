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
var Brands = {
  init: function(){
    this.loadData();
  },
  render_link_sku: function( data, type, full, meta ){
    link = data;
    if(full.sku_count > 0){
      link = "<a href='/skus?brand_name=" + data + "'>" + data +"</a>";
    }
    return link;  
  },
  loadData: function(){
    var self = this;
    var url = $('#brands-list').data('target');
    var user_type = $('#brands-list').data('user');
    var table = $('#brands-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        "iDisplayLength": 10,
        "bInfo": true,
        "bServerSide": true,
        "autoWidth": false,
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
        "aoColumns": [
          {
            "sTitle": 'Brand ID',
            "bSortable": true,
            "sClass": "left",
            "mData": "brand_id"
          },
          {
            "sTitle": 'Brand Name',
            "bSortable": true,
            "sClass": "left",
            "mData": "brand_name",
            "render": self.render_link_sku
          },
          {
            "sTitle": 'URL',
            "bSortable": false,
            "sClass": "left",
            "mData": "url"
          },
          {
            "sTitle": 'No. of SKUs',
            "bSortable": true,
            "sClass": "left",
            "mData": "sku_count"
          }
        ],
        fnServerData: function( sUrl, aoData, fnCallback ) {
          tmp = aoData;
          aoData = CommonFunction.parseBrandFilterParams(aoData);
          draw = tmp[5];
          aoData.push({"name":"search", "value": draw.value.value});
          filter_export = aoData;
          $.ajax({
            type: "GET",
            url: url,
            data: aoData,
            dataType: 'json',
            success: fnCallback
          })
        },
        fnDrawCallback: function(setting){
          if(user_type == "Admin"){
            $("#ToolTables_brands-list_0").hide();
          }
        }
    });
  },
  export_file: function(){
    filter_export.push({"name":"file_type", "value": "Brand"});
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
  Brands.init();
});
