"use strict";

var casper = require('casper').create({verbose: true});

//Config
var apk = casper.cli.get('apk');
var username = 'super.apk.downloader@gmail.com';
var password = 'Apk@12345';
var screenshotFolderName = 'screenshots/';
var googleLoginURL = 'https://accounts.google.com/Login?hl=EN';
var googlePlayURL = 'https://play.google.com/store/apps/details?id=';
var screenshotName = ''+Date.now();


var apkLocation = '/data/app/'+apk+'-1.apk ./apks';

// Automate android apk installer
// Google login
casper.start(googleLoginURL, function() {
    console.log("page loaded...");

    this.fillSelectors('form#gaia_loginform', {
        'input[name="Email"]': username,
    });                                                 //Fills the email box with email
    this.click("#next");                                //Fills the email box with email


    this.wait(500, function() {                         //Wait for next page to load
        console.log("Inside WAIT...");

        this.waitForSelector("#Passwd",                 //Wait for password box
            function success() {
                console.log("SUCCESS...");
                this.fillSelectors('form#gaia_loginform', {
                    'input[name="Passwd"]': password,
                });                                     //Fill password box with PASSWORD
                this.click("#signIn");                  //Click sign in button
                this.wait(500, function() {});          //Wait for it fully sigin
            },
            function fail() {
                console.log("FAIL...");
            }
        );

    });
});


// take a screenshot after login
casper.then(function () {
    casper.capture(screenshotFolderName+'login'+screenshotName+'.png');
})


// Visit play store based on APK param
casper.thenOpen(googlePlayURL+apk, function() {
    this.echo(this.getTitle());                                         // Print page title and app name
});


// Click on install button
casper.then(function() {
    this.evaluate(function () {
         document.querySelectorAll('.info-container button')[1].click() // Selector maybe changed in the future b/c google update
    });

}).wait(5000).then(function() {
    this.capture(screenshotFolderName+'install1'+screenshotName+'.png');
});


// Click on second install button
casper.then(function () {
    this.click('#purchase-ok-button')                                   // Selector maybe changed in the future b/c google update
}).wait(3000).then(function() {
    this.capture(screenshotFolderName+'install2'+screenshotName+'.png');
    this.echo('Installed');
});

// casper.then(apkPath);


casper.run();
