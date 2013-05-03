// Get credentials from file
fs = require('fs')
if(fs.existsSync(process.env['HOME']+'/.wunderlist_login')){
  var array = fs.readFileSync(process.env['HOME']+'/.wunderlist_login', 'utf8').toString().split("\n");
  getTasks(array[0],array[1]);
}
else
{
  var readline = require('readline');

  var rl = readline.createInterface({
      input: process.stdin,
        output: process.stdout
  });
  rl.question("No Login found. Give me you wunderlist username (email) ", function(user) {
      rl.question("Give me you wunderlist password ", function(pass) {
      fs.writeFile(process.env['HOME']+"/.wunderlist_login", user+"\n"+pass+"\n", function(err) {
        if(err) {console.log(err);} 
        else {console.log("The file was saved!");}
      });
      rl.close();
      getTasks(user, pass)
    });
  });
}

function getTasks(user, pass)
{
var wl        = require('./Wunderlist2ApiJS/api')
    , username  = user
    , password  = pass
    , loginData = '{"email":"'+username+'","password":"'+password+'"}'

  wl.login(loginData, function(error, login){
    if(login){
      wl.setApiKey(login.token)

      wl.getMeLists(function(error, lists){
        wl.getMeTasks(function(error, tasks){
           console.log("\033[1;33mInbox: \033[0m")
           for(i in tasks){
             if(tasks[i].completed_at == null && tasks[i].list_id == 'inbox'){
              console.log("* " + tasks[i].title)
             }
           }
           for(j in lists){
             console.log("\033[1;33m" + lists[j].title+": \033[0m")
            for(i in tasks){
              if(tasks[i].completed_at == null && tasks[i].list_id == lists[j].id){
                if(tasks[i].starred == false){
                  console.log("* " + tasks[i].title)}
                else{
                  console.log("\033[1;31m* " + tasks[i].title + "\033[0m")}
              }
            }
           }
        });
      });   
    } else {
      console.log(error)
    }    
});
}
