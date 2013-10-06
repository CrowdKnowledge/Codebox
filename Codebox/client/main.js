Session.set('details', false);

if (Meteor.isClient) {

	Template.results.allResults = function(){
		return Snippets.find().fetch();
	}
	
	Template.results.title = function(){
		return this.title;
	}
	
	Template.results.author = function(){
		return this.author;
	}
	
	
	Template.results.cbid = function(){
		console.log('called');
		return this.cbid;
	}
	
	Template.details.isInDetail = function(){
		if(Session.get('details') == false){
			return false;
		} 
		return true;
	}
}

focusOn = function(id){
	Session.set('details', true);
	console.log('focussing on ' + id);
}

openContributor = function(){
console.log('something');
	var e = document.getElementById('inputTitle');
	var x = e.left;
	var y = e.top;
	window.scrollto(x, y);
}

insertSnippet = function(){
	Snippets.insert(new Snippet(document.getElementById('inputTitle').value
				 	 		   ,document.getElementById('inputDescription').value
				 	 		   ,document.getElementById('inputCode').value));
}


