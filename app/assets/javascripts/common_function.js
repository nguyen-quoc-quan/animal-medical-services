//= require dataTables/jquery.dataTables.js

var CommonFunction = {
  format_date: function(obj){
    if(obj !="" && obj != null){
      return moment(obj).format('MM/DD/YYYY');
    }else{
      return "";
    }
  },
  parseBrandSortParams: function(oSetting){
    var result = [];
    draw = oSetting[3];
    result.push({"name":"page","value":draw.value});
    // length
    draw = oSetting[4];
    result.push({"name":"per_page","value":draw.value});

    orders = oSetting[2].value;

    for(i = 0;i< orders.length;i++){
      order = orders[i];
      if(order.column == 0){
        result.push({"name":"sort[brand_id]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 1){
        result.push({"name":"sort[brand_name]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 3){
        result.push({"name":"sort[sku_count]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
    }
    return result;
  },
  parseBrandFilterParams: function(oSetting){
    var list_param = this.parseBrandSortParams(oSetting);
    // var list_filter={};
    // start_no = $("#brand-start-no-sku").val();
    // if(start_no){
    //   list_param.push({"name":"filter[sku_count][from]","value":start_no});
    // }

    // end_no = $("#brand-end-no-sku").val();
    // if(end_no){
    //   list_param.push({"name":"filter[sku_count][to]","value":end_no});
    // }

    return list_param;
  },
  parse_asc_desc_param: function(value){
    result = -2;
    if(value =="asc"){
      result = 1;
    }else if( value =="desc"){
      result = -1;
    }

    return result;
  },
  parseSkuSortParams: function(oSetting){
    var result = [];
    draw = oSetting[3];
    result.push({"name":"page","value":draw.value});
    // length
    draw = oSetting[4];
    result.push({"name":"per_page","value":draw.value});

    //Order
    orders = oSetting[2].value;

    for(i = 0;i< orders.length;i++){
      order = orders[i];
      if(order.column == 1){
        result.push({"name":"sort[name]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 2){
        result.push({"name":"sort[quantity_available]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 3){
        result.push({"name":"sort[eta]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
      else if(order.column == 0){
        result.push({"name":"sort[_id]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
    }
    return result;
  },
  parseSkuFilterParams: function(oSetting){
    var list_param = this.parseSkuSortParams(oSetting);
    // var list_filter={};
    // start_date = $("#sku-start-date").val();
    // if(start_date){
    //   list_param.push({"name":"filter[eta][from]","value":start_date});
    // }

    // end_date = $("#sku-end-date").val();
    // if(end_date){
    //   list_param.push({"name":"filter[eta][to]","value":end_date});
    // }

    // start_quantity = $("#sku-start-quantity").val();
    // if(start_quantity){
    //   list_param.push({"name":"filter[quantity_available][from]","value":start_quantity});
    // }


    // end_quantity = $("#sku-end-quantity").val();
    // if(end_quantity){
    //   list_param.push({"name":"filter[quantity_available][to]","value":end_quantity});
    // }

    return list_param;

  },
  parseUploadSortParams: function(oSetting){
    var result = [];
    draw = oSetting[3];
    result.push({"name":"page","value":draw.value});
    // length
    draw = oSetting[4];
    result.push({"name":"per_page","value":draw.value});

    //Order
    orders = oSetting[2].value;

    for(i = 0;i< orders.length;i++){
      order = orders[i];
      if(order.column == 1){
        result.push({"name":"sort[created_at]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 2){
        result.push({"name":"sort[status]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
      else if(order.column == 0){
        result.push({"name":"sort[file_name]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
    }
    return result;
  },
   parseOrgSortParams: function(oSetting){
    var result = [];
    draw = oSetting[3];
    result.push({"name":"page","value":draw.value});
    // length
    draw = oSetting[4];
    result.push({"name":"per_page","value":draw.value});

    //Order
    orders = oSetting[2].value;

    for(i = 0;i< orders.length;i++){
      order = orders[i];
      if(order.column == 0){
        result.push({"name":"sort[company_name]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 1){
        result.push({"name":"sort[website]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
    }
    return result;
  },
  parseUserSortParams: function(oSetting){
    var result = [];
    draw = oSetting[3];
    result.push({"name":"page","value":draw.value});
    // length
    draw = oSetting[4];
    result.push({"name":"per_page","value":draw.value});

    //Order
    orders = oSetting[2].value;

    for(i = 0;i< orders.length;i++){
      order = orders[i];
      if(order.column == 0){
        result.push({"name":"sort[full_name]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 1){
        result.push({"name":"sort[email]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }else if(order.column == 2){
        result.push({"name":"sort[_type]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
      else if(order.column == 4){
        result.push({"name":"sort[status]","value":CommonFunction.parse_asc_desc_param(order.dir)});
      }
    }
    return result;
  },
  currency: function(number, format) {

    var $this = this;

    if (!number || typeof(number) === 'object') {
      //incase just parameters are entered and not a number
      // var format = number;
      // number = $this.html();
      number = "";
    }else{
    var format = format || {},
      commas = format.commas || true,
      symbol = format.symbol || "$";

    number = parseFloat(number).toFixed(2);

    if (commas) {

      var count = 0;
      var numArr = number.toString().split("");

      var len = numArr.length - 6;

      for (var i = len; i > 0; i= i - 3) {
        numArr.splice(i,0,",");

      }

      number = numArr.join("");

    }

    if (typeof symbol === 'string') {
      number = symbol + number;

    }
  }

    // $this.html(number);

    return number;

    }
}

$.fn.dataTableExt.oApi.fnStandingRedraw = function(oSettings) {
    //redraw to account for filtering and sorting
    // concept here is that (for client side) there is a row got inserted at the end (for an add)
    // or when a record was modified it could be in the middle of the table
    // that is probably not supposed to be there - due to filtering / sorting
    // so we need to re process filtering and sorting
    // BUT - if it is server side - then this should be handled by the server - so skip this step
    if(oSettings.oFeatures.bServerSide === false){
        var before = oSettings._iDisplayStart;
        oSettings.oApi._fnReDraw(oSettings);
        //iDisplayStart has been reset to zero - so lets change it back
        oSettings._iDisplayStart = before;
        oSettings.oApi._fnCalculateEnd(oSettings);
    }
      
    //draw the 'current' page
    oSettings.oApi._fnDraw(oSettings);
};