class _facture{

constructor(com_list){
		this._num_facture;
		this._com_list = com_list;
		this._total_ttc;
		this._total_ht;
		this._frais_transport;
		this._remise_list;
		this._escompte;
		this.COM_FACTUREE = 7;
	}

async get_last_facture_num(){
	var num_fact = await this.async_prompt(); 
	this._num_facture = num_fact;
	return this._num_facture;
}

async async_prompt(){
    var num = await service_get_last_facture_num();
    return num.groups[0];
}

async facturer_cbk(num_fact,num_ordre){
 
    await this.facturer(num_fact,num_ordre);  
}

create_rebate_line(){
		getJsonClientListTask();
		$('#creer_ligne_remise').modal('show');
		init_creer_ligne_remise_modal();
	}

create_avoir_line(){
		
	}

create_order_line(){
		
	}

create_facture(){
		var buffer;
		service_get_last_facture_num(facturer,buffer);
	}

async facturer(){
	let _self=this;
		const num_fact = await this.async_prompt();
		const t = prompt("Numéro de facture",num_fact);

		if((t>0) && (!isNaN(t)) && (t !==undefined)){
			//const arr1 = this._com_list.toArray();
			const arr = this._com_list;//arr1.map((ro) => ro.innerText);
			service_create_facture(arr.join(),t);
			/*for(var i=0;i<arr.length;i++){
				await this.facturer_row.bind(_self)(arr[i],t);
			}
			var res = await service_update_facture(t);
			console.log(res);*/
		}
	}

async facturer_row(el,num_fact){

	let num_ordre = parseInt($(el).find(".com_id").text());
    if((num_fact !=undefined) &&(!isNaN(num_fact))){
        await sql_update_async("commandes","com_status_id",this.COM_FACTUREE,"com_id="+num_ordre);
        await sql_update_async("commandes","com_facture_num",num_fact,"com_id="+num_ordre);
        await this.create_ligne_facture(el,num_fact);
    }
}



async create_ligne_facture(el,facture_num){
		var num_ordre=$(el).find('.com_id').text();
		//var prix_unitaire = parseFloat($(el).find('.com_prix_au_mille_ht').text());
		//var unite = parseInt($(el).find('.com_unite').text());
		//var quantite = parseInt($(el).find('.com_quantite').text());
		//var total_ht = prix_unitaire * quantite / unite;
		return await service_create_facture(num_ordre,facture_num,total_ht);
	}

async update_facture_num(el,facture_num,obj_tp){
		var v1="commandes";
	    var v2="com_facture_num";
	    var v3=facture_num;
	    var v5=obj_tp.columns[11][INT];
		var com_id=$(el).find('.com_id').text();
		var v4="com_id="+com_id;
	    sql_update(v1,v2,v3,v4);
	    var col_id = 0;
	    var current_row_index = (obj_tp.loc).filterIndex(col_id,com_id);
	    (obj_tp.loc).setValue(v3,current_row_index,v5);
	}

update_status(el,status,obj_tp){
		var v1="commandes";
	    var v2="com_status_id";
	    var v3=status;
		var v5=obj_tp.columns[6][INT];
		var com_id=$(el).find('.com_id').text();
		var v4="com_id="+com_id;
	    sql_update(v1,v2,v3,v4);
	    var col_id = 0;
	    var current_row_index = (obj_tp.loc).filterIndex(col_id,com_id);
	    (obj_tp.loc).setValue(v3,current_row_index,v5);	
	}
}
console.log("facture loaded");