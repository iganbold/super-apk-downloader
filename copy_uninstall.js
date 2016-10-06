"use strict";

var cmd=require('node-cmd');

var apk = process.argv[2];
var apkLocation = '/data/app/'+apk+'-1.apk ./apks';


function copyApk() {
  cmd.get(' adb pull '+ apkLocation,
         function(data){
             console.log('APK pull :\n\n',data)
             uninstallApk();
         }
     );
}

function uninstallApk() {
  cmd.get(' adb uninstall '+ apk,
         function(data){
             console.log('APK uninstall :\n\n',data);
         }
     );
}

function apkPath() {
  cmd.get('adb shell pm path '+ apk,
         function(data){
             console.log('APK path :\n\n',data);

              if('' !== data) {
                console.log("APK Found");
                copyApk();
              } else {
                  console.log("APK Not Found");
                  setTimeout(apkPath, 25000);
              }
         }
     );
}

apkPath();
