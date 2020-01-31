# Apps-Script-Gmail-Push-Notifications-v2
An updated version of  Gmail Push Notifications in Apps Script

This sample project shows how to setup your Apps Script project to register a Gmail account for push notifications and how to programmatically set up the the proper pubsub publishing channels and subscriptions.   

### Setup
1) Create a new Apps Script project using the two .gs files in this repo.   
2) Add the following libraries:  
&nbsp;&nbsp;&nbsp;&nbsp;PubSubApp - `1BX8k4tkiA3CZGIZ0hHccfiF7o-EvjqLCt3hoU3osDQBhnGlQTRnawOGE`  
&nbsp;&nbsp;&nbsp;&nbsp;GSApp - `1wkfv_Mm0IyruEZyPZsrctcSmc1T9y0-bArl2gIzMd6RVYJAwWeJ5gpDu`  
3) Publish the project as a web app  
4) Register the web app in the Chrome web store leaving it in draft mode.  This will verifiy ownership of the script.  
5) Run the script from the cuurrent web app URL. (the /exec one).  You will get an error about no doGet().  Copy the URL it redirected you toward.  
6) Add the URL to the `WEBHOOK_URL` var in main.gs  
7) Open up the project developers console:  
&nbsp;&nbsp;&nbsp;&nbsp;a) Under Credentials -> Domain Verification: Add the url you copied in `WEBHOOK_URL` in step 6 ommiting the `exec` from the end  
&nbsp;&nbsp;&nbsp;&nbsp;b) Create a new service account.  Download the credentials as json.  
&nbsp;&nbsp;&nbsp;&nbsp;c) Under Overview:  Enable the PubSub API and the Gmail API   
&nbsp;&nbsp;&nbsp;&nbsp;d) Copy the json credentials and paste it into script properties under the key `jsonKey`.  
8) Copy the developers console project Id to `PROJECTID` var in main.gs  
9) Create a spreadsheet.  Create a sheet called `Log`.  Copy the file Id and paste it in `SpreadsheetApp.openById()` of doPost().  
9) Update the webapp version to pick up changes made to the project.  
  
### Running the sample code  
1) Run `setupPubSub()`  
2) Run `enrollEmail()` to start listening to your Gmail notifications.  They will be logged to the spreadsheet set up in step 9.  
3) Run `disEnrollEmail()` to stop listening to your Gmail notifications.  

