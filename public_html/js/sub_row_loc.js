class sub_row_loc extends _sub_row{

constructor(parent,config){
    super(parent,config);
    var db1="commandes";
    var db2="client";
    var db3="livraison";
    var db4="offreCom";

    this.COL_ID = [0, "com_id"];
    this.COL_STATUS = [6, "com_status_id"];
    this.COL_OFFRE_COM_ID =  [21, "offrecom_id"];


    this._list_lbl = [
        ["num ordre",this._parent._columns[0],db1,this.COL_ID],
        ["prefix",this._parent._columns[1],db1,this.COL_ID],
        ["article",this._parent._columns[2],db1,this.COL_ID],
        ["quantité",this._parent._columns[3],db1,this.COL_ID],
        ["id client",this._parent._columns[4],db1,this.COL_ID], //4
        ["site client",this._parent._columns[5],db1,this.COL_ID], //5
        ["status",this._parent._columns[6],db1,this.COL_ID,UI_COMBO,this.get_status_combo.bind(this),0], //6
        ["commentaires",this._parent._columns[7],db1,this.COL_ID],
        ["num commande",this._parent._columns[8],db1,this.COL_ID],//8
        ["date livraison",this._parent._columns[9],db1,this.COL_ID],
        ["type timbre",this._parent._columns[10],db1,this.COL_ID], //10
        ["centilisation",this._parent._columns[11],db1,this.COL_ID], //11
        ["ref etiq",this._parent._columns[12],db1,this.COL_ID],
        ["prod type",this._parent._columns[13],db1,this.COL_ID],
        ["client",this._parent._columns[14],db1,this.COL_ID],
        ["num offre",this._parent._columns[15],db4,this.COL_OFFRE_COM_ID],
        ["ref article client",this._parent._columns[16],db1,this.COL_ID],
        ["ref article fact",this._parent._columns[17],db1,this.COL_ID],
        ["prix achat",this._parent._columns[18],db1,this.COL_ID],
        ["prix vente",this._parent._columns[19],db1,this.COL_ID],
        ["num DAE",this._parent._columns[20],db3,this.COL_ID],
        [],
        [],
        ["num facture",this._parent._columns[23],db1,this.COL_ID]
    ];

        //this._optionList = this._status._statusClass;
}

async populate_sub_row_menu(){
    
        var obj = $("#"+this._parent._row_id);
        var status = obj.closest('tr').find('.com_status_id').text().trim();
        var i_status = this._status.revertStatus(status);
        
        var com_id = obj.closest('tr').find('div.full-circle').text().trim();
        var arr_dyn_menu= ["detail", this.detail_loc_cbk.bind(this),["","standard",com_id]];
        var prefix = obj.closest('tr').find('.com_prefix').text().trim();
        var article = obj.closest('tr').find('.com_article_id').text().trim();
        
        //if(i_status>=parseInt(this.LIVRE))
        arr_dyn_menu.push("bl", this.view_bl_cbk.bind(this),["","standard",com_id]);
        arr_dyn_menu.push("déstockage", this.view_destock_cbk.bind(this),["","standard",com_id]);
        arr_dyn_menu.push("article", this.view_article_cbk.bind(this),["","standard",prefix+"-"+article]);
        //if(i_status>=LIVRE)
        //    arr_dyn_menu.push("facturer", this.facturer_cbk.bind(this),["","standard",com_id]);
        arr_dyn_menu.push("supprimer", this.delete_loc_cbk.bind(this),["","standard",com_id]);
        arr_dyn_menu.push("bon de stockage", this.bon_stockage_loc_cbk.bind(this),["","standard",com_id]);

        this.addSubMenuRow(arr_dyn_menu);
};

detail_loc_cbk(arg) {
    var ordre_client_id = parseInt(arg[2]);
    var wnd = new detail_wnd(this._parent);
    wnd.createWndDetail(ordre_client_id,"detail_ordre_client_id");
    initEvents_lbl_val();
    initEvents_combo_val();
};

view_bl_cbk(arg){
    var num_ordre = arg[2];
    window.open('http://' + this._config.get_ip() + '/PhpFormulaire/bon_de_livraison.php?numOrdre=' + num_ordre, 'Imprimer bon de livraison', 'window settings');
}

bon_stockage_loc_cbk(arg){var num_ordre = arg[2];
    window.open('http://' + this._config.get_ip() + '/PhpFormulaire/bon_de_retour.php?numOrdre=' + num_ordre, 'Imprimer bon de retour', 'window settings');
}

view_destock_cbk(arg){
    var num_ordre = arg[2];
    window.open('http://' + this._config.get_ip() + '/PhpFormulaire/bon_de_livraison_destockage.php?numOrdre=' + num_ordre, 'Imprimer bon de destockage', 'window settings');
}

async delete_loc_cbk(arg){
    var num_ordre = arg[2];
    let res = await service_detele_command(num_ordre);
    if(res.ok){
        $('#'+this._current_row_id).remove();
        $('#sub_'+this._current_row_id+"_1").remove();
        $('nav').notify("commande "+num_ordre+ " supprimée");
    }
}

async view_article_cbk(arg){
    var fullArticle = arg[2];
     let res = await service_read_desc_article(fullArticle);
    if(res.ok){
        //$('#'+this._current_row_id).remove();
        let text="";
        let arr = (res.groups[0]).split(";");
        for(let p in arr){text+=arr[p]+"\n"}
        $.notify(text);
    }
}

}//end of class
