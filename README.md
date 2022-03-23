# SMS Dashboard

A react app for sending SMS to distribution lists.

This app allows you to:

* 📲 Mass send SMS to distribution lists
* 🎯 Target an audience for each message
* 🔬 View message metrics (characters, bytes and segments count)
* 💸 Estimate your costs
* 👥 Browse your distribution lists
* 💬 Browse your messages history

This is a demo app that uses fake static data to illustrate its functionalities. It is by no mean ready for production. In order to make it work, you would need to implement a few calls on your own in the _services_ directory first and perhaps a few missing features.

## Quickstart

Well, just clone the repo and then you know the drill :

```sh
npm install
npm start
```

Then you can log in by using the demo crendentials:

* Username: user@domain.com
* Password: 12345

## Features

### Send a SMS
![image](https://user-images.githubusercontent.com/6100619/159527368-631b2b39-d3d0-45ab-9b19-3b4673b34942.png)

This section allows to compose a message body and filter subscriptions to target a specific audience. These filters will adapt to the subscriptions and they can be customized with the `REACT_APP_DISTRIBUTION_FILTERS` environment variable. Editing the message and changing the filter will update the statistics so it's easier to stay on budget.

If you try to send the message, nothing will happen as no messaging service has been connected yet. However, have a look at the console and you will see some debug info :

![image](https://user-images.githubusercontent.com/6100619/159532781-a1e663a5-af9a-4639-88ea-e665856f5be8.png)


### Browse Subscriptions
![image](https://user-images.githubusercontent.com/6100619/159527479-8ee21aee-2bf2-49fe-8d4d-76194a91b082.png)

This section displays information about the audience and consents. Note that the table will adapt to the JSON object it receives from your backend. Say you were to add a consent field to each subscription, the table will expand to show that new column. You can play around with db.json to test your own schema. 

### View Message Log
![image](https://user-images.githubusercontent.com/6100619/159527595-84312e45-9766-4985-9b33-f7cba8d4b6b1.png)

The message log keeps track of everything that is sent through the app. The table will adapt to the schema that is provided by the backend.
