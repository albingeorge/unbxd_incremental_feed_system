#Unbxd Incremental Feed Upload System

##Requirement

A system which pools the product data and uploads it through the Unbxd feed upload API every n minutes

##Installation
1. Install the dependencies
```npm install```
2. Start the app
```node app.js```

##Request Formats

1. Set secret key

    Type of request: POST

    URL: ```localhost:3000/incremental-feed-upload/config/<site_name>/<site_secret_key>/<secret_key_if_exists>```

    Body Format:
    ```
        {
            'secret_key': 'ASD123123ADWQGTGTG'
        }
    ```

2. Configuration

    Type of request: POST

    URL: ```localhost:3000/incremental-feed-upload/config/<site_name>/<site_secret_key>```

    Body Format:
    ```
    {
        'interval': '15'
    }
    ```

3. Send data

    Type of request: POST

    URL: ```localhost:3000/incremental-feed-upload/<site_name>/<site_secret_key>```

    Body Format:
    ```
    {
        "uniqueId": "AB0068",
        "stock": "4"
    }
    ```