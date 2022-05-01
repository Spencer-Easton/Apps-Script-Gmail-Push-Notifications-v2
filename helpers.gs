
function addGmailPolicy(Policy){
  return PubSubApp.policyBuilder()
  [(Policy)?"editPolicy":"newPolicy"](Policy)
  .addPublisher("SERVICEACCOUNT", 'gmail-api-push@system.gserviceaccount.com')
  .getPolicy();
}

function addDomainSubs(Domain,Policy){
  return PubSubApp.policyBuilder()
  [(Policy)?"editPolicy":"newPolicy"](Policy)
  .addPublisher("DOMAIN", Domain)
  .getPolicy();
}

function getSubscriptionPolicy(){
  return PubSubApp.policyBuilder()
  .newPolicy()
  .addSubscriber("DOMAIN","ccsknights.org")
}


function watchEmail(fullTopicName,watchOptions){
  var options = {email:"me",token:ScriptApp.getOAuthToken(),labelIds:[]};
  
  for(var option in watchOptions){
    if(option in options){
      options[option] = watchOptions[option];
    }
  }
   Logger.log(options);
  var url = "https://www.googleapis.com/gmail/v1/users/"+options.email+"/watch"
  
  var payload = {
    topicName: fullTopicName,
    labelIds: options.labelIds
  }
  
  var params = {
    method:"POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers:{Authorization: "Bearer "+ options.token
    },
    muteHttpExceptions:true
  }
  
   var results = UrlFetchApp.fetch(url, params);
  
  if(results.getResponseCode() != 200){
     throw new Error(results.getContentText())
  }else{
    return JSON.parse(results.getContentText());
  }
  
 }

function CreateTopic(topicName) {
  var topic;
  PubSubApp.setTokenService(getTokenService());
  var pubservice = PubSubApp.PublishingApp(PROJECTID);
  try{topic = pubservice.newTopic(topicName)}
  catch(e){topic = pubservice.getTopic(topicName);}
  return topic;  
}

function CreateSubscription(subscriptionName,topicName,webhookUrl){
  var sub;
  PubSubApp.setTokenService(getTokenService());
  var subService = PubSubApp.SubscriptionApp(PROJECTID);
  try{sub = subService.newSubscription(subscriptionName,topicName,webhookUrl)}
  catch(e){sub = subService.getSubscription(subscriptionName,topicName,webhookUrl)}
  return sub;
}


function getTokenService(){
  var jsonKey = JSON.parse(PropertiesService.getScriptProperties().getProperty("jsonKey"));  
  var privateKey = jsonKey.private_key;
  var serviceAccountEmail = jsonKey.client_email; 
  var sa = init(privateKey, ['https://www.googleapis.com/auth/pubsub'], serviceAccountEmail);
  sa.addUser(serviceAccountEmail)
  .requestToken();
  return sa.tokenService(serviceAccountEmail);
}


function requestGmailScope_(){GmailApp.getAliases()}

