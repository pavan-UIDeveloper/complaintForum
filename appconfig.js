let appconfig={};

appconfig.port=3000;
appconfig.allowedCrossOrigins='*';
appconfig.env='dev';
appconfig.db={
    url:'mongodb://127.0.0.1:27017/CFDB'
}
appconfig.version = 'api/v1';
 

module.exports={
    port:appconfig.port,
    allowedCrossOrigins:appconfig.allowedCrossOrigins,
    env:appconfig.env,
    db:appconfig.db,
    version:appconfig.version
}