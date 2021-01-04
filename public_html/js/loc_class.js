
//let test_worker;
class loc_class extends _list_of_class {

	constructor(parent,table_id,list_class_tp,list_class_row,table_row_class,sub_row_class,columns,html_framework,status){
       super(parent,table_id,list_class_tp,list_class_row,table_row_class,sub_row_class,columns,html_framework,status);
    }
/*
    init_worker(){
        this._myWorker = new Worker('../../new_'+this._filter._id+'/public_html/js/'+this._filter._id+'_update_worker.js');
        this.test_worker = this._myWorker; 
        const f = this.handle_worker_response.bind(this);
        this._myWorker.onmessage= f; 
    } */
    
}
console.log("loc_class loaded");