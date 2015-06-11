//= require iCheck/icheck.min.js
//= require jeditable/jquery.jeditable.js
//= require dataTables/jquery.dataTables.js
//= require dataTables/dataTables.bootstrap.js
//= require dataTables/dataTables.responsive.js
//= require dataTables/dataTables.tableTools.min.js
//= require jqGrid/i18n/grid.locale-el.js
//= require jqGrid/jquery.jqGrid.min.js
//= require jquery-ui/jquery-ui.min.js

var UploadedFiles = {
  init: function(){
    this.loadData();
    this.download_template();
  },
  render_action :function(obj){
    if(obj != null){
      url = obj.replace("public", "") + "?version=" + Date.now();
      return "<a class='action-lnk' href=" + url + "> Download </a>";
    }else{
      url = "#";
      return "<a class='action-lnk disable-link'> Download </a>";
    }
  },
  loadData: function(){
    var self = this;
    var url = $('#uploaded-files-list').data('target');
    var table = $('#uploaded-files-list')
      .dataTable({
        "responsive": true,
        "bFilter": true,
        "bLengthChange": true,
        "bPaginate": true,
        "iDisplayLength": 10,
        "bInfo": true,
        "bServerSide": true,
        "autoWidth": false,
        "order": [[1, "desc" ]],
        stateSave: true,
        "aoColumns": [
          {
            "sTitle": 'File Name',
            "bSortable": true,
            "sClass": "left",
            "mData": "file_name"
          },
          {
            "sTitle": 'File Type',
            "bSortable": true,
            "sClass": "left",
            "mData": "file_type"
          },
          {
            "sTitle": 'Uploaded Date',
            "bSortable": true,
            "sClass": "left",
            "mData": "c_at",
            "mRender": CommonFunction.format_date
          },
          {
            "sTitle": 'Status',
            "bSortable": true,
            "sClass": "left",
            "mData": "status"
          },
          {
            "sTitle": 'Records Imported',
            "bSortable": false,
            "sClass": "left",
            "mData": "success_per_total"
          },
          {
            "sTitle": 'Report',
            "bSortable": false,
            "sClass": "left",
            "mData": "report_url",
            "mRender": self.render_action
          }
        ],
        fnServerData: function( sUrl, aoData, fnCallback ) {
          tmp = aoData;
          aoData = CommonFunction.parseUploadSortParams(aoData);
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

        }

    });
  },

  download_template: function(){
    $('#selected-template').click(function () {
       file_name =  $('#template-selector').find(":selected").val();
       if(file_name == ""){
        alert("Please choose a template");
       }else{
        file_url = "/templates/" + file_name;
        window.location = file_url;
       }

    });
  }

};

$(function(){
  UploadedFiles.init();
  // disable auto discover
  Dropzone.autoDiscover = false;
 
  // grap our upload form by its id
  $("#new_uploaded_file").dropzone({
    // restrict image size to a maximum 1MB
    maxFilesize: 1,
    // changed the passed param to one accepted by
    // our rails app
    paramName: "uploaded_file[file]",
    // show remove links on each image upload
    addRemoveLinks: true,
    acceptedFiles: ".csv", 
    // if the upload was successful
    success: function(file, response){
      // add the dz-success class (the green tick sign)
      $(file.previewElement).addClass("dz-success");
      $("#uploaded-files-list").dataTable().api().ajax.reload();
    }

  }); 
});