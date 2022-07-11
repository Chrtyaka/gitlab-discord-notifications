# Gitlab discord notification service

# Current available features
- Notify discord users if merge request opened
- Randomly pick reviewers for merge request (from discord)
- Notify merge request author if notes added
- Supports multiple projects

# Setup
```
yarn && yarn start
```

# Configuration
```json
{ 
  // Express app settings
  "express": {
    "port": 3000,  // Express app port
    "webhookReceiveRoute": "/webhook/receive" // Express app receive url
  },

  /* Projects settings. App support multiple projects, which means you can handle webhook events from different gitlab projects. 
  */

  "projects": [
    {
      "id": [36, 37], // Gitlab projects ID's for receive webhooks from
      "discord": {
        "webhookUrl": "someUrl1", // Discord Webhook URL
        "webhookName": "Bot name", // Discord Bot name
        "webhookAvatar": "Bot avatar", // Discord bot avatar
      },
      "team": [
        {
          "gitlabUsername": "user1",
          "discordId": "user1",
          "gitlabId": "user1"
        },
      ]
    },
    {
      "id": 362,
      "discord": {
        "webhookUrl": "someUrl1", // Discord Webhook URL
        "webhookName": "Bot name", // Discord Bot name
        "webhookAvatar": "Bot avatar", // Discord bot avatar
      },
       "team": [
        {
          "gitlabUsername": "user2",
          "discordId": "user2",
          "gitlabId": "user2"
        },
      ]
    }
  ],

  // Colors for Discord embeds

  "colors": {
    "mergeRequests": {
      "open": "#74b9ff",
      "close": "#0984e3",
      "merge": "#55efc4",
      "approved": "#a29bfe"
    },
    "notes": {
      "add": "#fd79a8"
    },
    "pipelines": {
      "success": "#55efc4",
      "failed": "#d63031"
    }
  },

  // Feature toggles :D

  "features": {
    "pickReviewers": false
  }
}

```