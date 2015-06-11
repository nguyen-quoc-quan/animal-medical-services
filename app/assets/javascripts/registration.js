var Registration = {
	init: function(){
		this.witch_register();
		this.check_validate_icon();
		this.check_org();
		this.hide_organization();
		this.validate_form();
		this.submit_customer_sign_up();
		this.init_select();
		this.submit_brand_user_sign_up();
	},
	witch_register: function(){
		// $('#brand-form').hide();
		if($('#customer').is(":checked")){
				$('#customer-form').show();
				$('#brand-form').hide();
			}else{
				$('#customer-form').hide();
				$('#brand-form').show();
			};
		$('.witch-register').change(function(){
			$('#alert-message').html('');
			var customer = $('#customer');
			var brand = $('#brand-user');
			if(customer.is(":checked")){
				$('#customer-form').show();
				$('#brand-form').hide();
			}else{
				$('#customer-form').hide();
				$('#brand-form').show();
			}
		});
	},

	check_org: function(){
		$('#org').hide();
		$('#check-org').hide();
		$("#org input").prop('disabled', true);
		$('#customer_email').blur(function(){
		// $('#check-org').click(function(){
			email = $('#customer_email').val();
			url = $(this).data('url')
			$.ajax({
				type: 'get',
				dataType: 'json',
				url: url,
				data:{
					email: email
				},
				success: function(data){
					$('#check-org').show();
					$('#customer_email').parent().find('.input-group-addon').show();
					if(data.data == null){
						$('input#customer_organization_id').val('');
						$('#org input#company-name').val('');
						domain = email.substr(email.indexOf("@")+1);
						$('#org input#website').val('http://www.' + domain);
						if($('#org input#website').valid()){
							$('#org input#website').parent().find('.input-group-addon').show();
						}else{
							$('#org input#website').parent().find('.input-group-addon').hide();
						}
						$('#org').show();
						$("#org input").prop('disabled', false);
						$('#customer_require').val(true);
						$('#org input#company-name').parent().find('.input-group-addon').hide();
						// $('#org .input-group-addon').hide();
					}else{
						$('#org input#company-name').val(data.data.company_name);
						$('#org input#website').val(data.data.website);
						$('input#customer_organization_id').val(data.data._id.$oid);
						$('#org').show();
						$('#org .input-group-addon').show();
						$("#org input").prop('disabled', true);
						$('#customer_require').val(true)
					}
				},
				error: function(data){
					console.log('error');
					console.log(data);
				}
			});
		});
	},

	hide_organization: function(){
		$('#customer_email').keyup(function(){
			$('#org').hide();
			$("#org input").prop('disabled', false);
			$('input#customer_organization_id').val('');
			$('#customer_require').val(false);
			$('#check-org').hide();
			$('#customer_email').parent().find('.input-group-addon').hide();
		});
	},

	compare_domain: function(email, website){
		domain = email.substr(email.indexOf("@")+1);
		domainRegex = new RegExp("[a-zA-Z0-9]+[.]"+ domain + "$",'i');
		if (website.match(domain) == null){
			return false;
		}else{
			return true;
		}
	},

	submit_customer_sign_up: function(){
		self = this;
		$('#customer-submit').click(function(){
			console.log('click');
			$('#customer-form').valid();
			if($('#customer_require').val()=='true'){
				console.log(true);
				email = $('#customer-form #customer_email').val();
				website = $('#customer-form #website').val();
				if(self.compare_domain(email, website) == true){
					$('#customer-form').submit();
				}else{
					if($('#customer-form #company-name').attr('disabled')){
						$('#customer-form').submit();
					}
					else{
						if(confirm('Do you want to create Organization with this url?')){
							$('#customer-form').submit();
						}
					}
				}
			}
			else{
				console.log(false);
				$('#alert-message').html('<div class="alert alert-danger alert-dismissable">\
																	<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>\
              												You must check your email first.\
          												</div>\
          												');
				return false;
			}
		});
	},

	submit_brand_user_sign_up: function(){
		$('#brand-user-submit').click(function(){
			$('#brand-form').valid();
			if($('#brand_id').val()==''){
				$('#alert-message').html('<div class="alert alert-danger alert-dismissable">\
																	<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>\
              												You must choose Brand.\
          												</div>\
          												');
				return false;
			}
			else{
				$('#brand-form').submit();
			}
		});
	},

	validate_form: function(){
		$('#customer-form').validate({
			rules: {
	    'customer[password_confirmation]': {
	      equalTo: "#customer-form #password"
	    }
  	}
		});
		$('#brand-form').validate({
				rules: {
	    'brand_user[password_confirmation]': {
	      equalTo: "#brand-form #password"
	    }
	  }
		});
	},

	init_select: function(){
		// $('select').select2();
		url = $("#brand_id").data("url");
		initial_brand = $("#brand_id").data("brand");
		
		if(initial_brand == null){
			brand_infos = [null,'']
		}else{
			brand_infos = initial_brand.split(';');
		}
		$("#brand_id").select2({
			initSelection: function(element, callback) {
			callback({id: brand_infos[0], brand_name: brand_infos[1] });
			},
			placeholder: "Choose Brand",
		  ajax: {
		    url: url,
		    dataType: 'json',
		    delay: 250,
		    data: function (data, page) {
		      return{
              search: data,
              file_type: "Brand"
            };
		    },
		    results: function (data, page) {
		      // parse the results into the format expected by Select2.
		      // since we are using custom formatting functions we do not need to
		      // alter the remote JSON data
		      for (var i = 0; i < data.aaData.length; i++) {
              data.aaData[i].id=data.aaData[i]._id.$oid;
            }
            return { results: data.aaData };
		    },
		    cache: true,
		    contentType: false,
        processData: false,
		  },
		  escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
		  minimumInputLength: 2,
		  containerCssClass: 'form-control',
		  formatResult: this.formatRepo, // omitted for brevity, see the source of this page
		  formatSelection: this.formatRepoSelection // omitted for brevity, see the source of this page
		});
	},

	 formatRepo: function(repo) {
    var markup = '</div>'+repo.brand_id + " - " + repo.brand_name;

    return markup;
  },

   formatRepoSelection:function (repo) {
    return repo.brand_name;
  },
  check_validate_icon: function(){
  	$('#customer-form .input-group-addon, #brand-form .input-group-addon').hide();
		$('#customer-form input[type=text], #customer-form input[type=password], #customer-form input[type=url],#brand-form input[type=text], #brand-form input[type=password], #brand-form input[type=url], #brand-form input[type=email]').keyup(function(){
			if($(this).valid()){
				$(this).parent().find('.input-group-addon').show();
			}else{
				$(this).parent().find('.input-group-addon').hide();
			}
		});
		$('#customer-form input[type=text], #customer-form input[type=password], #customer-form input[type=url],#brand-form input[type=text], #brand-form input[type=password], #brand-form input[type=url], #brand-form input[type=email]').blur(function(){
			if($(this).valid()){
				$(this).parent().find('.input-group-addon').show();
			}else{
				$(this).parent().find('.input-group-addon').hide();
			}
		});
  }

};

$(function(){
	Registration.init();
});