/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class loc_status  extends _status{

  constructor(){
    super();
    this._status_combo = 
                '<option class="btn btn-violet btn-filter" value="enregistré">Enregistré</option>'+
                '<option class="btn btn-warning btn-filter" value="planifié">Plannifié</button>'+
                '<option class="btn btn-pink btn-filter" value="pret_a_produire">Prêt à produire</option>'+
                '<option class="btn btn-yellow btn-filter" value="en_production">En production</option>'+
                '<option class="btn btn-success btn-filter" value="produit">Produit</option>'+
                '<option class="btn btn-success btn-filter" value="livré">Livré</option>'+
                '<option class="btn btn-success btn-filter" value="facturé">Facturé</option>'+
                '<option class="btn btn-success btn-filter" value="facturé_en_stock">Facturé_en_stock</option>'+
                '<option class="btn btn-success btn-filter" value="payé">Payé</option>'+
                '<option class="btn btn-success btn-filter" value="retour_client">Retour client</option>'+
                '<option class="btn btn-success btn-filter" value="appro_client">Appro client</option>'+
                '<option class="btn btn-success btn-filter" value="retour_fournisseur">Retour fournisseur</option>'+
                '<option class="btn btn-success btn-filter" value="ordre_interne">Ordre interne</option>'+
                '<option class="btn btn-default btn-filter" value="annulé">Annulé</option>'+
                '<option class="btn btn-default btn-filter" value="déstocké">Déstocké</option>'+
                '<option class="btn btn-default btn-filter" value="all">Tout</option>';



    this._statusClass = {
      0:"enregistré"
      ,1:"plannifié"
      ,2:"planifié"
      ,3:"pret_a_produire"
      ,4:"en_production"
      ,5:"produit"
      ,6:"livré"
      ,7:"facturé"
      ,9:"payé"
      ,10:"payé"
      ,11:"payé"
      ,12:"payé"
      ,13:"payé"
      ,14:"impayé"
      ,15:"retour_client"
      ,16:"appro_client"
      ,17:"retour_fournisseur"
      ,18:"ordre_intern"
      ,19:"proforma"
      ,20:"annulé"
      ,21:"attente_paiement"
      ,22:"échéance_dépassée"
      ,23:"virtual"
      ,24:"facturé_en_stock"
      ,25:"non_facturé"
      ,26:"déstocké"
    };
    this._COL_STATUS = 6;
    this._COL_ID = 0;
    this.DEFAULT="0,1,2,3,4,5,6,15,16,24";
}

get_id(){
  return this._COL_ID;
}

get_status(){
  return this._COL_STATUS;
}

    convertStatus(status){
    return this._statusClass[status] || "no";
}
 
   revertStatus(status){
    for(var i=0;i<Object.keys(this._statusClass).length;i++){
      if(status===this._statusClass[i])
        return i;
    }
      return this._statusClass[status] || "no";
  }

}


