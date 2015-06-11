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

var Organizations = {
  init: function(){
    this.loadData();
  },

  loadData: function(){
    var self = this;
    var url = $('#organizations-list').data('target');
    var table = $('#organizations-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        "bProcessing": true,
        "iDisplayLength": 10,
        "bInfo": true,
        "bServerSide": true,
        "autoWidth": false,
        stateSave: true,
        "aoColumns": [
          {
            "sTitle": 'Company Name',
            "bSortable": true,
            "sClass": "left",
            "mData": "company_name"
          },
          {
            "sTitle": 'Website',
            "bSortable": true,
            "sClass": "left",
            "mData": "website"
          }
        ],
        fnServerData: function( sUrl, aoData, fnCallback ) {
          draw = aoData[5];
          search_str = draw.value.value;
          aoData = CommonFunction.parseOrgSortParams(aoData);
          aoData.push({"name":"search", "value": search_str});
          aoData.push({"name":"list_type","value":"All"});
          $.ajax({
            type: "GET",
            url: url,
            data: aoData,
            dataType: 'json',
            success: fnCallback
          })
        },
        fnDrawCallback: function(setting){
          if($('#assigned-organizations-list').length > 0){
            self.select_org();
          }
        }
    });
    var table2 = $('#assigned-organizations-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        "bProcessing": true,
        "iDisplayLength": 10,
        "bInfo": true,
        "bServerSide": true,
        "autoWidth": false,
        stateSave: true,
        "aoColumns": [
          {
            "sTitle": 'Company Name',
            "bSortable": true,
            "sClass": "left",
            "mData": "company_name"
          },
          {
            "sTitle": 'Website',
            "bSortable": true,
            "sClass": "left",
            "mData": "website"
          }
        ],
        fnServerData: function( sUrl, aoData, fnCallback ) {
          draw = aoData[5];
          search_str = draw.value.value;
          aoData = CommonFunction.parseOrgSortParams(aoData);
          aoData.push({"name":"search", "value": search_str});
          aoData.push({"name":"list_type","value":"Assigned"});
          $.ajax({
            type: "GET",
            url: url,
            data: aoData,
            dataType: 'json',
            success: fnCallback
          })
        },
        fnDrawCallback: function(setting){
          self.unselect_org();
        }
    });
  },
  new_org:function(){
    $('#new-org').click(function(){
      if ($('form#organization-add').valid()){
        var params=[];
        params.push({"name":"organization[company_name]", "value":$('#company-name').val()});
        params.push({"name":"organization[website]", "value":$('#website').val()});
        $.ajax({
          type: "POST",
          url: '/organizations',
          data: params,
          beforeSend: function(xhr) {
                  xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                },
          dataType: 'json',
          success: function(){
            $('#organizations-list').dataTable().fnDraw();
            $("#assigned-organizations-list").dataTable().fnDraw();
          },
          error: function(data){
            $('#alert-message').html(data.responseJSON.messages);
          }
        });
      }
    });
  },

  validate_org: function(){
    $('form#organization-add').validate();
  },

  select_org:function(){
    $('#organizations-list tbody tr').click(function () {
        $(this).toggleClass('selected');
    } );
  },
  unselect_org:function(){
    $('#assigned-organizations-list tbody tr').click(function () {
        $(this).toggleClass('selected');
    } );
  },
  add_orgs:function(){
    $('#add-orgs').click(function(){
    var org_ids = [];
    $('#organizations-list').DataTable().rows('.selected').data().each(function(row){
      org_ids.push(row._id.$oid)
    });
    var params = [];
    params.push({"name":"brand[organization_ids]", "value":org_ids});
    $.ajax({
            type: "PUT",
            url: '/brands/add_orgs',
            data: params,
            dataType: 'json',
            beforeSend: function(xhr) {
                  xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                },
            success: function(){
              $('#organizations-list').dataTable().fnDraw();
              $("#assigned-organizations-list").dataTable().fnDraw();
            }
    });
  });
  },
  remove_orgs:function(){
    $('#remove-orgs').click(function(){
    var org_ids = [];
    $('#assigned-organizations-list').DataTable().rows('.selected').data().each(function(row){
      org_ids.push(row._id.$oid)
    });
    var params = [];
    params.push({"name":"brand[organization_ids]", "value":org_ids});
    $.ajax({
            type: "PUT",
            url: '/brands/remove_orgs',
            data: params,
            dataType: 'json',
            beforeSend: function(xhr) {
                  xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                },
            success: function(){
                $('#organizations-list').dataTable().fnDraw();
                $("#assigned-organizations-list").dataTable().fnDraw();
            }
    });
  });
  }
};

$(function(){
  Organizations.init();
  Organizations.add_orgs();
  Organizations.remove_orgs();
  Organizations.new_org();
  Organizations.validate_org();
});