# Apps-Script-Gmail-Push-Notifications-v2
An updated version of  Gmail Push Notifications in Apps Script

This sample project shows how to setup your Apps Script project to register a Gmail account for push notifications and how to programmatically set up the the proper pubsub publishing channels and subscriptions.   

### Setup
#### Google Apps Script: Setup
1) Create a new [Google Apps Script](https://scripts.google.com) project.
2) Under General Settings, make sure "Show 'appsscript.json' mainfest in file editor" is checked
2) Copy the four files in this repo to your project. You will overwrite the contents in the existing appsscript.json.
3) Click 'Libraries +' on the left of the editor and add the following library:  
&nbsp;&nbsp;&nbsp;&nbsp;PubSubApp - `1BX8k4tkiA3CZGIZ0hHccfiF7o-EvjqLCt3hoU3osDQBhnGlQTRnawOGE`
#### Google Apps Script: Deploy the App
1) Click the "Deploy" button at the top of the Apps Script editor and select "New Deployment."
2) Select "Web App" from the left-hand options.
3) Under "Execute As" select "Me"
4) Under "Who has Access" select "Anyone"
3) Publish the project as a web app and copy the URL provided.
5) Open the URL in a web browser. You **will** get an error about no doGet().  Copy the URL in the address bar. **This is your endpoint URL.**
#### Google Cloud Platform Console: 
1) [Create a new project in Google Cloud Platform](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
2) Note the Project Number. You will need this later.
3) In APIs & Services > Credentials, click "+ Create Credentials" and select "Service Account." Note the email address for later.
4) Back at APIs & Services, click the newly created user, then click "Keys."
5) Click "Add Key" then "Create Key" and select JSON.
6) Download the new key. The contents of this file will be used later.
7) In APIs & Services > Enabled APIs & Services, select "+ Enable APIs & Services."
8) Enable Gmail API, Google Sheets API, and PubSub API.
#### Google Sheets:
1) Create a new Google Sheet named "Log." Note the file Id.
#### Google Apps Script Editor
1) Copy your Project Number into var PROJECTID.
2) Copy your endpoint URL into var WEBHOOK_URL.
3) Copy your file Id for the Google Sheet into const SPREADSHEETID.
4) In Project Settings > Script Properties, create a new property named 'jsonKey' and paste the **contents* of the json credentials file into the value.
5) Deply your app once more to capture all the changes you have made.
  
### Running the sample code  
1) Run `setupPubSub()`  
2) Run `enrollEmail()` to start listening to your Gmail notifications.  They will be logged to the spreadsheet set up in step 9.  
3) Run `disEnrollEmail()` to stop listening to your Gmail notifications.  

