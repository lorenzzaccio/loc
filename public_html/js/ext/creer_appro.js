
const CREER_APPRO_MODAL_ID = "#creer_appro_modal";

var fixe_prix_achat_ui = [
            "#dem_num",
            "#dem_quantity",//quantité
            "#dem_buy_price",//prix HT
            "#dem_date",
            "#dem_fourn_combo",
            "#dem_ref_offre",
            "#offre_type_combo",
            "#dem_rem"
            ];

var fixe_prix_achat_sql = [
            "demPrix_num",
            "demPrix_autreQuantite",//quantity
            "demPrix_quantite",//prix achat
            "demPrix_date",
            "demPrix_fourn",
            "demPrix_numOffre",
            "",
            "demPrix_rem"
            ];

//création des composants de l'UI
let appro_client = (CREER_APPRO_MODAL_ID+' '+'#appro_client_combo');
let appro_article = $(CREER_APPRO_MODAL_ID+' '+'#appro_article_combo');
let appro_date = $(CREER_APPRO_MODAL_ID+' '+'#appro_date');
let quantite = $(CREER_APPRO_MODAL_ID+' '+'#appro_quantite');
let quantite_par_carton = $(CREER_APPRO_MODAL_ID+' '+'#appro_quantite_par_carton');
let appro_type_combo = $(CREER_APPRO_MODAL_ID+' '+'#appro_type_combo');
let appro_num_ordre = $(CREER_APPRO_MODAL_ID+' '+'#appro_num_ordre');
let appro_num_ordre_fourn = $(CREER_APPRO_MODAL_ID+' '+'#appro_num_ordre_fourn');
let appro_emplacement = $(CREER_APPRO_MODAL_ID+' '+'#appro_emplacement');
let appro_num_palette = $(CREER_APPRO_MODAL_ID+' '+'#appro_num_palette');
let appro_rem = $(CREER_APPRO_MODAL_ID+' '+'#appro_rem');
let appro_fiscal_check = $(CREER_APPRO_MODAL_ID+' '+'#appro_fiscal_check');
let appro_texte_fiscal = $(CREER_APPRO_MODAL_ID+' '+'#appro_texte_fiscal');
let appro_type_timbre = $(CREER_APPRO_MODAL_ID+' '+'#appro_type_timbre');
let appro_centilisation = $(CREER_APPRO_MODAL_ID+' '+'#appro_centilisation');
let appro_num_dae = $(CREER_APPRO_MODAL_ID+' '+'#appro_num_dae');
let appro_form = (CREER_APPRO_MODAL_ID+' '+'#appro_form'); 
let appro_new_article_btn = $(CREER_APPRO_MODAL_ID+' '+'#appro_new_article_btn');
let appro_save_btn = $(CREER_APPRO_MODAL_ID+' '+'#appro_save_btn');
let appro_quit_btn = $(CREER_APPRO_MODAL_ID+' '+'#appro_quit_btn');
let appro_fiscal_group = $(CREER_APPRO_MODAL_ID+' '+'.fiscal');
let appro_fournisseur_group = $(CREER_APPRO_MODAL_ID+' '+'.fournisseur');
let b_init_appro_form=false;

function init_ui_components(){
    
    appro_article = $(CREER_APPRO_MODAL_ID+' '+'#appro_article_combo');
    appro_date = $(CREER_APPRO_MODAL_ID+' '+'#appro_date');
    quantite = $(CREER_APPRO_MODAL_ID+' '+'#appro_quantite');
    quantite_par_carton = $(CREER_APPRO_MODAL_ID+' '+'#appro_quantite_par_carton');
    appro_type_combo = $(CREER_APPRO_MODAL_ID+' '+'#appro_type_combo');
    appro_emplacement = $(CREER_APPRO_MODAL_ID+' '+'#appro_emplacement');
    appro_num_palette = $(CREER_APPRO_MODAL_ID+' '+'#appro_num_palette');
    appro_rem = $(CREER_APPRO_MODAL_ID+' '+'#appro_rem');
    appro_fiscal_check = $(CREER_APPRO_MODAL_ID+' '+'#appro_fiscal_check');
    appro_texte_fiscal = $(CREER_APPRO_MODAL_ID+' '+'#appro_texte_fiscal');
    appro_type_timbre = $(CREER_APPRO_MODAL_ID+' '+'#appro_type_timbre');
    appro_centilisation = $(CREER_APPRO_MODAL_ID+' '+'#appro_centilisation');
    appro_num_dae = $(CREER_APPRO_MODAL_ID+' '+'#appro_num_dae');   
    //appro_form = $(CREER_APPRO_MODAL_ID+' '+'#appro_form');
    appro_new_article_btn = $(CREER_APPRO_MODAL_ID+' '+'#appro_new_article_btn');
    appro_save_btn = $(CREER_APPRO_MODAL_ID+' '+'#appro_save_btn');
    appro_quit_btn = $(CREER_APPRO_MODAL_ID+' '+'#appro_quit_btn');
    appro_fiscal_group = $(CREER_APPRO_MODAL_ID+' '+'.fiscal');
}
function init_creer_appro_modal(){
    init_ui_components();
    init_form_appro();
    init_date_picker(appro_date);
    init_appro_date(appro_date);
    //autocomplete
    autocomplete(document.querySelector(appro_client), availableTagsClientList,handle_client_change);
}


function handle_client_change(val){
    if(val === undefined) return;
    let id = val.split("-")[0];
    populate_article_list_for_client(id);
}

async function populate_article_list_for_client(id){
    $(appro_article).empty();
    $(appro_article).append('<option value="patientez">patientez ...</option>');
    let list_article = await getListArticlesParClientTask(id);
    let arr = [];
    
    
    for(let row in list_article.groups){
        let val = list_article.groups[row].split(";");
        let article = val[0]+"-"+val[1];
        arr.push([article,article]);
    }
    populate_combo(appro_article,arr);

}

function init_appro_date(ui_date){
    var date = new Date();
    var day_in_year = get_day_in_year(date);
    let iso_date = (date.toISOString()).split("T")[0];
    $(ui_date).val(iso_date);
}

function get_day_in_year(date){
    var now = new Date(date);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}

function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length-size);
}


function appro_select_type(obj){
    let type = parseInt($(obj).val());
    console.log(type);
    if(type===3){
        $(appro_fiscal_group).show();
        $(appro_fournisseur_group).hide();
    }
    if(type===2){
        $(appro_fiscal_group).hide();
        $(appro_fournisseur_group).hide();
    }
    if(type===1){
        $(appro_fiscal_group).hide();
        $(appro_fournisseur_group).show();
    }
}

function record_appro(){
    fixe_prix_achat_ui.forEach(function(el,index){
        if (($(el).attr('data-status')==="modify")&&(fixe_prix_achat_sql[index]!==""))
            sql_update(TABLE_DEM,fixe_prix_achat_sql[index],"'"+$(el).val()+"'",SQL_UPDATE_COND_CREER_OFFRE+g_demPrix_id);

    });    
    sql_update(TABLE_DEM,DEMPRIX_STATUS_SQL,PRIX_ACHAT_FIXE_STATUS,SQL_UPDATE_COND_CREER_OFFRE+g_demPrix_id);
}

function init_form_appro(){
    if(b_init_appro_form) return;

    b_init_appro_form=true;
    const form = document.querySelector(appro_form);

    const f= ()=>{
        event.preventDefault();
        sendData(form,"../../capstech_lib_v2/php/create_appro.php");
    };
  
    //form.removeEventListener("submit",f);
    form.addEventListener("submit",f.bind(form)); 
}
