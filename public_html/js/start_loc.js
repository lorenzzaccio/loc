class start_loc{

    constructor(id){
       this._columns = [
        [0, "com_id",0],
                [1, "com_prefix",0],
                [2, "com_article_id",0],
                [3, "com_quantite",0],
                [4, "com_client_id",0],
                [5, "com_client_site",0],
                [6, "com_status_id",0],
                [7, "com_desc_ordre",0],
                [8, "com_num_com_client",0],
                [9, "com_date_livraison",0],
                [10, "com_type_timbre",0],
                [11, "com_centilisation",0],
                [12, "com_ref_article_client_etiq",0],
                [13, "com_type",0],
                [14, "sitecli_addr1",0],
                [15, "offrecom_offrenum",0],
                [16, "com_ref_article_client",0],
                [17, "com_ref_article_client_fact",0],
                [18, "com_prix_au_mille_ht_achat",0],
                [19, "com_prix_au_mille_ht",0],
                [20, "liv_num_daa",0],
                [21, "offrecom_id",0],
                [22, "com_unite",0],
                [23, "com_facture_num",0]
        ]; 
        this._id = id;
        this.load_scripts_dir();
    }


async load_scripts_dir(dir,id){
    var l1 = await loadScript("../../new_"+this._id+"/public_html/js/_html_fw_"+this._id+".js");
    //var l1 = await loadScript("../../new_"+this._id+"/public_html/js/"+this._id+"_class.js");
    var l1 = await loadScript("../../new_"+this._id+"/public_html/js/sub_row_"+this._id+".js");
    var l1 = await loadScript("../../new_"+this._id+"/public_html/js/"+this._id+"_status.js");
    var l1 = await this.start();
}


 load_external_html(html_framework){
       $.get("../../new_"+this._id+"/public_html/ext_html/creer_appro.html", function(data){
            $(html_framework.get_html_framework().modals).append(data);
        });
}

 set_cbk(){
   $('.fullContainer_loc #btnAdd').on('click',function(e){
       //if ($(CREER_APPRO_MODAL_ID).length===0)
            init_creer_appro_modal();
        $(CREER_APPRO_MODAL_ID).modal('toggle'); 
    });
}

 async load_external_scripts(html_framework){
    await loadScript("../../new_"+this._id+"/public_html/js/ext/creer_appro.js");
    await this.load_external_html(html_framework);
}

 async start(){
    var status = new loc_status();
    var html_framework = new _html_fw_loc(this._id,"Ordres clients",status._status_combo);
    await this.load_external_scripts(html_framework);
    this.set_cbk();
    init_loader();
    let sub_row_nn = sub_row_loc;

    new _list_of_class(parent.document.body,null,null,null,undefined,sub_row_nn,this._columns,html_framework,status);
}

}
new start_loc("loc");
console.log("start_loc started");
