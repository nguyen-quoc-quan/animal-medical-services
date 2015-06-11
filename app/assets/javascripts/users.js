//= require jeditable/jquery.jeditable.js
//= require dataTables/jquery.dataTables.js
//= require dataTables/dataTables.bootstrap.js
//= require dataTables/dataTables.responsive.js
//= require dataTables/dataTables.tableTools.min.js
//= require jqGrid/i18n/grid.locale-el.js
//= require jqGrid/jquery.jqGrid.min.js
//= require jquery-ui/jquery-ui.min.js
//= require registration

var Users = {
  init: function(){
    this.loadData();
  }, 
  render_status: function( data, type, full, meta ){
    if(data == true){
      return "Active"
    }
    else if(data == false){
      return "Disabled"
    }
  },
  loadData: function(){
    var self = this;
    var url = $('#users-list').data('target');
    var table = $('#users-list')
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
              "sButtonText": "Disabled",
              "fnClick": function (nButton, oConfig, oFlash) {
                var user_ids = [];
                $('#users-list').DataTable().rows('.selected').data().each(function(row){
                  user_ids.push(row._id.$oid)
                });
                var params = [];
                params.push({"name":"user_ids", "value":user_ids});
                params.push({"name":"status", "value":false});
                $.ajax({
                  type: "PUT",
                  url: '/users/change_status',
                  data: params,
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                  },
                  dataType: 'json',
                  success: function(){
                    $('#users-list').dataTable().fnStandingRedraw();
                  }
                });
              }

          },{
              "sExtends":    "select",
              "sButtonText": "Active",
              "fnClick": function (nButton, oConfig, oFlash) {
                var user_ids = [];
                $('#users-list').DataTable().rows('.selected').data().each(function(row){
                  user_ids.push(row._id.$oid)
                });
                var params = [];
                params.push({"name":"user_ids", "value":user_ids});
                params.push({"name":"status", "value":true});
                $.ajax({
                  type: "PUT",
                  url: '/users/change_status',
                  data: params,
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                  },
                  dataType: 'json',
                  success: function(){
                    $('#users-list').dataTable().fnStandingRedraw();
                  }
                });
              }

          }]
        },
        "aoColumns": [
          {
            "sTitle": 'Full Name',
            "bSortable": true,
            "sClass": "left",
            "mData": "full_name"
          },
          {
            "sTitle": 'Email',
            "bSortable": true,
            "sClass": "left",
            "mData": "email"
          },
          {
            "sTitle": 'Type',
            "bSortable": true,
            "sClass": "left",
            "mData": "_type"
          },
          {
            "sTitle": 'Assigned Organization/Brand',
            "bSortable": false,
            "sClass": "left",
            "mData": "assigned_owner"
          },
          {
            "sTitle": 'Status',
            "bSortable": true,
            "sClass": "left",
            "mData": "status",
            "render": self.render_status
          }
        ],
        fnServerData: function( sUrl, aoData, fnCallback ) {
          tmp = aoData;
          aoData = CommonFunction.parseUserSortParams(aoData);
          draw = tmp[5];
          aoData.push({"name":"search", "value": draw.value.value});
          $.ajax({
            type: "GET",
            url: url,
            data: aoData,
            dataType: 'json',
            success: fnCallback
          })
        },
        fnDrawCallback: function(setting){
          self.select_users();
        }
    });
  },
  select_users:function(){
    $('#users-list tbody tr').click(function () {
        $(this).toggleClass('selected');
    } );
  }
};

$(function(){
  Users.init();
  $('#user-form').validate();
});



