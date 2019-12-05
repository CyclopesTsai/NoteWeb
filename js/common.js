function getIntegerVal(val){
	if(val){
		val += '';
		var regex = /\D/g;
		val = (val.replace(regex,"")).trim();
		val = val*1;
	}
	return val;
}

function getIntegerText(val){
	if(val){
		val += '';
		var regex = /\D/g;
		val = (val.replace(regex,"")).trim();
		val = val;
	}
	return val;
}

function getFloatVal(val){
	if(val){
		val += '';
		var regex = /[^0123456789.]/g;
		val = (val.replace(regex,"")).trim();
	}
	return val;
}