class loc_worker_class extends worker_class{
	constructor(e){
		super(e);
	}

	async get_response_buffer(e){
    	return await getFullOrdreClientTask(e.date_deb,e.date_fin,e.status,"");
  	}
}