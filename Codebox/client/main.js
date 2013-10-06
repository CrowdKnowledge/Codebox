Session.set('details', false);
Session.set('results', []);
Session.set('query', "");


if (Meteor.isClient) {

	Template.results.allResults = function(){
		console.log('rerunnnnn');
		return Session.get('results');
	}
	
	Template.results.title = function(){
		return this.title;
	}
	
	Template.results.author = function(){
		return this.author;
	}
	
	Template.results.cbid = function(){
		return this.cbid;
	}
	
	Template.details.isInDetail = function(){
		if(Session.get('details') == false){
			return false;
		} 
		return true;
	}
	
	Template.searchbar.events({
		'keydown': function (event) {
			Session.set('query', document.getElementById('searchbar').value);
		}
	});
}



focusOn = function(id){
	Session.set('details', true);
	console.log('focussing on ' + id);
}

openContributor = function(){
    $("html, body").animate({scrollTop: $("#inputTitle").offset().top}, 300); 
}

insertSnippet = function(){
	Snippets.insert(new Snippet(document.getElementById('inputTitle').value
				 	 		   ,document.getElementById('inputDescription').value
				 	 		   ,document.getElementById('inputCode').value));
	Session.set('query', document.getElementById('searchbar').value);
}


Deps.autorun(function () {
	// should add a cancel call here
	if(Session.get('query') != ''  && typeof(Session.get('query')) != 'undefined'){
		Meteor.call('analyze', Session.get('query'), function(e, r){
			var rs = [];
			for(var i = 0; i < r.length; i++){
				rs.push(Snippets.findOne({cbid: r[i]}));
			}
			Session.set('results', rs);
		});
	}
});

