var path = require('path');

var fs = require('fs');
var folderuploadname;
var fileuploadname;
var feedname;
var cmdscript =' ';
var scripter;
var typefile;
var pathUpWri = 'C:/nuget-automated/assets/nugetpackages/';
var pathforChoco = 'C:\\nuget-automated\\assets\\nugetpackages\\';
var pathforCreateDir = 'C:\\nuget-automated\\assets\\nugetpackages\\';
module.exports =
  {
      upload: function  (req, res)
      {
          console.log('in upload function');
          req.file('file').upload({dirname : pathUpWri+folderuploadname+'/installers/'},function (err, files)
            {
                console.log('file upload success.');
                fileuploadname = path.basename(files[0].fd.split('/').reverse()[0]);
                console.log(fileuploadname);
                typefile = fileuploadname.split('.').pop();
                console.log(typefile);
                if (err)
	              {
		                return res.negotiate(err);
		                return res.serverError(err);
	              }
            });
			console.log(fileuploadname);
			return res.send('Response OK');
      },
      calculatefeed : function (req,res)
      {
          var data = req.allParams();
          feedname = data.feedname;
          console.log(feedname);
          cmdscript = data.cmd;
          console.log(cmdscript);
          return res.send('Response OK');
      },
      calculate: function (req, res)
      {
          var data = req.allParams();
          var fs = require('fs');
		      var scriptps1_msi = '$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition; $parentDir = Split-Path -Parent $scriptDir; $installerName = \'\\installers\\'+fileuploadname+'\' ;$installFile = (Join-Path $parentDir -ChildPath $installerName) ;Install-ChocolateyInstallPackage "$installName" "msi" "/quiet" "$installFile"; ';
		      var scriptps1_exe = '$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition; $parentDir = Split-Path -Parent $scriptDir; $installerName = \'\\installers\\'+fileuploadname+'\' ;$installFile = (Join-Path $parentDir -ChildPath $installerName) ;Install-ChocolateyInstallPackage "$installName" "exe" "/S" "$installFile"; ';

          if (cmdscript === undefined)
          {
                 cmdscript = ' ';
                 if (typefile === 'msi')
                 {
                     scripter = scriptps1_msi+cmdscript;
                 }
                 else
                 {
                     scripter = scriptps1_exe+cmdscript;
                 }
          }
          else
          {
                 if (typefile === 'msi')
                 {
                     scripter = scriptps1_msi+cmdscript;
                 }
                 else
                 {
                     scripter = scriptps1_exe+cmdscript;
                 }

          }
          fs.writeFile(pathUpWri+folderuploadname+'/tools/chocolateyInstall.ps1',
          scripter, function(err)
          {
               if(err)
               {
                   return console.log(err);
               }
          });

          fs.writeFile(pathUpWri+folderuploadname+'/run.nuspec',
          js2xmlparser("package", data), function(err)
          {
               if(err)
               {
                   return console.log(err);
               }
          });
          var exec = require('child_process').exec,child;
          child = exec('cd '+pathUpWri+folderuploadname+' && '+'choco pack '+ pathUpWri+folderuploadname+'/run.nuspec',
          function (error, stdout, stderr)
          {
               console.log('stdout: ' + stdout);
               console.log('stderr: ' + stderr);
               if (error !== null)
               {
                     console.log('exec error: ' + error);
               }
          var filenupkg = data.metadata.id+'.'+data.metadata.version+'.nupkg';
          var exec = require('child_process').exec,child;
          child = exec('cpush --force '+pathforChoco+folderuploadname+'\\'+filenupkg+' -source http://package.test.compass.int.thomsonreuters.com:81/nuget/'+feedname,
          function (error, stdout, stderr)
          {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null)
                {
                     console.log('exec error: ' + error);
                }
                return res.send('response OK');
          });
          });
          var exec = require('child_process').exec,child;
          child = exec('cd '+pathforChoco+folderuploadname+' && '+'NuGet SetApiKey admin:eikonTest12 -source http://package.test.compass.int.thomsonreuters.com:81/nuget/'+feedname,
          function (error, stdout, stderr)
          {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null)
              {
                  console.log('exec error: ' + error);
              }
          });

      },
      createfolder: function  (req, res)
      {
          var data = req.allParams();
          folderuploadname = data.value;
          console.log(folderuploadname);
          var exec = require('child_process').exec,child;
          child = exec('mkdir '+pathforCreateDir+data.value,
          function (error, stdout, stderr)
          {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null)
              {
                  console.log('exec error: ' + error);
              }
          });
          child = exec('mkdir '+pathforCreateDir+data.value+'\\installers',
          function (error, stdout, stderr)
          {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null)
              {
                  console.log('exec error: ' + error);
              }
          });
          child = exec('mkdir '+pathforCreateDir+data.value+'\\tools',
          function (error, stdout, stderr)
          {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null)
              {
                  console.log('exec error: ' + error);
              }
          });
         return res.send('Response OK');
      }
  };
