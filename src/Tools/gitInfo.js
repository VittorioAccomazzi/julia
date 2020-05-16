const {exec} = require ('child-process-promise');
const fs = require('fs');

( async () =>{

    let gitInfo = {
        version : "developer",
        long : ""
    }

    try
    {
        let short = await exec('git rev-parse --short HEAD')
        let long  = await exec('git rev-parse HEAD')
        let stat  = await exec('git status')

        let status = stat.stdout;
        let isRel  = status.indexOf("nothing to commit, working tree clean") > 0;
        if( isRel ){
            gitInfo.version = short.stdout;
            gitInfo.long= long.stdout; 
        }
        fs.writeFileSync('src/Tools/gitInfo.json', JSON.stringify(gitInfo));
    } catch ( ex ){
        console.error( "Unable to get git info :"+ex.message)
    }

})();