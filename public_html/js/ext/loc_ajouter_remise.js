
const LOC_AJOUTER_REMISE_MODAL_ID = "#lof_ajouter_renew";


const LOC_CLIENT = "#loc_ajouter_remise_client";
const LOC_SITE_CLIENT = "#loc_ajouter_remise_site_client";
const LOC_LIBELLE = "#loc_ajouter_remise_libelle_fact";
const LOC_DATE = "#loc_ajouter_remise_date";
const LOC_PRIX_ACHAT = "#loc_ajouter_remise_prix_achat";
const LOC_PRIX_VENTE = '#loc_ajouter_remise_prix_vente';
const LOC_REF_OFFRE = "#loc_ajouter_remise_num_offre";
const LOC_COMMENT = "#loc_ajouter_remise_desc";
const LOC_FORM = "#loc_ajouter_remise_form";


function loc_init_ajouter_remise_modal(num_dem,prefix,article,prix,quantity){
    $(LOC_AJOUTER_REMISE_MODAL_ID+' '+renew_LOF_DATE_UI).val(loc_init_ajouter_remise_date());
    loc_ajouter_remise_init_form();
}

function loc_init_ajouter_remise_date(){
  init_date_picker("loc_ajouter_remise_date",function() {
  });
  return today();
} 

function loc_ajouter_remise_init_form(){
    $( LOC_FORM ).off( "submit");
    $( LOC_FORM).on( "submit", function( event ) {
      event.preventDefault();
      var data= $( this ).serialize();
      var options = { 
        type: "GET",
        dataType : 'json',
        crossDomain: true,
        cache: false,
        async: true,
        timeout: 10000,
        url: "../../capstech_lib_v2/php/loc_ajouter_remise.php",
        data:data,
        beforeSubmit:  function(){
                          $.notify("veuillez patienter ....");
                          $(LOC_AJOUTER_REMISE_MODAL_ID).closest('.modal').modal('toggle');
                          return true; 
                          },  // pre-submit callback 
        success:       function(){if(statusText===1) 
                                    $.notify("action effectuée avec succès"); 
                                  else 
                                    $.notify("DB erreur !!!");},  // post-submit callback 
        error:         function(){$.notify("connection erreur !!!")}
      };

      $(this).ajaxForm(options); 
      $(this).ajaxSubmit(options);

      return false;
    } );
}