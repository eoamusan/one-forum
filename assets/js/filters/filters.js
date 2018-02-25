app.filter('formatMedical', [function() {

	// Create the return function
	return function(record) {

		if(!(record == undefined)){

			var data = [];

			if(record.length != 0){
				for(var i = 0; i < record.length; i++){
					if(record[i].label){
						data.push(record[i].label);
					}
				}

				return (data);
			}
	    }
	}
}]);

app.filter('reverse', function() {
  return function(items) {
  	if(items){
	    return items.slice().reverse();
	}
  };
});