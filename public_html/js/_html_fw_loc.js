class _html_fw_loc extends _html_fw{
     constructor(id,title_bar,status_options){
        super(id,title_bar,status_options);
        this.load_class_facture();
    }

    add_filter(swipe_name){
        $('.'+swipe_name+' .outer').append(
            '<div class="filter_bar">'+
            '<div class="inner"><select id="'+this._html_framework.status_combo+'"></select></div>'+
            '<div class="inner"><input type="search"  placeholder="Search" class="'+this._html_framework.input_search+'"></div>'+                                
            '<div class="inner">'+this.create_slider()+'</div>'+
            //'<div class="inner">'+this.create_label_slide()+'</div>'+
            '<div class="inner"><button id="facture_loc_btn" class="btn btn-success btn-sm" style="visibility:hidden" >facturer</button></div>'+
            '<div class="inner"><button id="facturation_mode_loc_btn" class="btn btn-success btn-sm" >facturation</button></div>'+
            
            '</div>'
            );
    }

    async load_class_facture(){
        var l1 = await loadScript("../../new_"+this._id+"/public_html/js/ext/_facture.js");
    	await this.init_listeners();
    }

    async init_listeners(){
        $('#facture_loc_btn').on('click',(e)=>{
            //get checked row
            let t = document.querySelectorAll("#tb_loc tr :checked");
            let y = Array.from(t).map(row=>row.parentNode.parentNode.querySelector('.com_id').textContent);
            var fact = new _facture(y);//$('#'+this._html_framework.table_body_id+' .main_rowProd:visible .com_id'));
            fact.facturer.bind(fact);
            fact.facturer();
        });
        this.facturation_mode=false;
        $('#facturation_mode_loc_btn').on('click',(e)=>{
            this.facturation_mode = !this.facturation_mode;
            const create_td_check = () =>{
                const td = document.createElement("td");
                const check_box = document.createElement("input");
                check_box.setAttribute("type","checkbox");
                check_box.addEventListener('click',e => {e.stopPropagation();});
                td.append(check_box);
                return td;
            }
    
            if(this.facturation_mode){
               document.querySelector('#facture_loc_btn').style.visibility='visible';
               Array.from(document.querySelectorAll('#'+this._html_framework.table_body_id+" tr")).map(row => row.prepend(create_td_check()));
                
            }else{
                document.querySelector('#facture_loc_btn').style.visibility='hidden';
                Array.from(document.querySelectorAll('#tb_loc [type="checkbox"]')).map(row=>row.parentNode.parentNode.removeChild(row.parentNode));
            }

        });
    }
    
}