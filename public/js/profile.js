$(document).on('change', '.btn-file :file', function() {
	var input = $(this), id = $(this).attr('id');
	input.trigger('fileselect', [ id ]);
});

$(document).ready(function() {

	$('.btn-file :file')
			.on(
					'fileselect',
					function(event, id) {

						try {
							var reader = new FileReader();
							reader
									.readAsDataURL(document
											.getElementById(id).files[0]);
							reader.onload = function(oFREvent) {
								document
										.getElementById("thumbnail_"
												+ id).src = oFREvent.target.result;
							}
						} catch (err) {
							alert("Please try again,something went wrong"
									+ err);
						}
						$(".upload-icon-" + id).hide();
						$("#thumbnail_" + id).show();
					});

	$(".remove-img-gly").click(function(e) {
		var id = $(this).attr("id");
		if (id === null)
			return;

		id = id.substring(2);
		e.preventDefault();
		$("#thumbnail_" + id).hide();
		$(".upload-icon-" + id).show();
	});

	$(".page-link")
			.click(
					function() {
						var atr = $(this).attr("data-target");
						var visiblePage = $(".page-scr:visible");
						$(".page-scr").hide();
						if (atr === "previous") {
							if ($(visiblePage)
									.prev(".page-scr").attr(
											"id") != null) {
								$(visiblePage)
										.prev(".page-scr")
										.show();
							} else {
								$(visiblePage).show();
							}

						} else if (atr === "next") {
							if ($(visiblePage)
									.next(".page-scr").attr(
											"id") != null) {
								$(visiblePage)
										.next(".page-scr")
										.show();
							} else {
								$(visiblePage).show();
							}
						} else {
							$(atr).show();
						}
					});
	
	//field validation at the time of submit
	
	$("#profileForm").submit(function(event){
	    
		var flag=false;
		var msg="";
		$(this).find( 'input[required-field]' ).each(function () {				
			 var par=$(this).attr("parent-div");
			 $(this).removeClass("error-input");
		     
			 if($(this).val()===''){	
				 flag=true;
				
				 $(".page-scr").hide();				 
				 $("#"+par).show();
				 $(this).addClass("error-input");
				 
				 if(msg!=""){
					 msg=msg+",";						 
				 }
				 msg= msg+$(this).attr("desc")
		     }		   
		 });
		if(flag){
			event.preventDefault();
			$("#alert-profile").append("<span>"+msg+"</span> are required ,please enter");
			$("#alert-profile").show();
		}
	});
	
});