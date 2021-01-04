class table_row_loc extends _table_row {
	constructor(row_mapper,row_id, data,config,sub_row,columns,status) {
		super(row_mapper,row_id, data,config,sub_row,status);
		this._columns = columns;
		this._status = status;
		this.COL_ID = this._columns[0];
		this.COL_STATUS = this._columns[6];
		this._status_index = this.COL_STATUS[INT];
		this._status_str = this.COL_STATUS[STR];
		this._star_id = 0;
		this.create(data);
		};
}
