var PROJECTID = 'api-project-...';
var WEBHOOK_URL = 'https://script.google.com/a/macros/.../exec'

function doPost(e){
  var postBody = JSON.parse(e.postData.getDataAsString());
  var messageData = Utilities.newBlob(Utilities.base64Decode(postBody.message.data)).getDataAsString();
  var ss = SpreadsheetApp.openById('...').getSheetByName("Log");
  ss.appendRow([new Date(), messageData, JSON.stringify(postBody,undefined,2)])
  return 200;
}

function setupPubSub(){
  var newTopic = CreateTopic("mailTrigger");
  newTopic.setIamPolicy(addGmailPolicy());
  Logger.log(newTopic.getName());
  var newSub = CreateSubscription("mailTrigger",newTopic.getName(),WEBHOOK_URL);
}

function disEnrollEmail(email){
  var email = email || "me";
  var res = UrlFetchApp.fetch("https://www.googleapis.com/gmail/v1/users/"+email+"/stop",{method:"POST",headers:{authorization:"Bearer "+ScriptApp.getOAuthToken()}});
  Logger.log(res.getContentText());
}

function enrollEmail(email){
  var email = email || "me";
  PubSubApp.setTokenService(getTokenService())
  var topicName = PubSubApp.PublishingApp(PROJECTID).getTopicName("mailTrigger")
  Logger.log(watchEmail(topicName,{labelIds:["INBOX"], email:email}));
}

