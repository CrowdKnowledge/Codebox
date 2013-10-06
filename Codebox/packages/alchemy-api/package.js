Package.describe({
    summary: "wrapper of alchemyapi"
});
Npm.depends({'alchemy-api': "1.0.0"});

Package.on_use(function(api){
     api.add_files('alchemy-api.js', ['client', 'server']);
    if(api.export){
        api.export('ALC');
    }
});