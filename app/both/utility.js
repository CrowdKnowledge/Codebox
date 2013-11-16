randKey = function(len){
	if(typeof(len) != 'number'){
		len = 5;
	}
	len = Math.max(0, len);
	return Math.random().toString().substring(5, 5 + len);
}