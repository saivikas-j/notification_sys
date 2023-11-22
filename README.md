# notification_sys

## Installation

Use Node version >= 18

```
  npm install
  npm start
```

Make sure the pollution-service server is running before running it.<br/>
You can also create a job using cron to periodically run the code after a certain interval



## Guide

* This notification system interacts with the backend of the AirLifeGoa website. It gets the latest data of pollution for each station and each and every user's data. 
* The program then computes the AQI values for PM2.5 and PM10 for each station. 
* The program then checks that recorded date of the pollutants values' for each station and only considers the ones whose recorded date matches the current date on which the program is being run.
* After filtering out the current data, it iterates over each user who has subscribed to daily notifications and checks their last send date and considers only the ones whose last send date is atleast one less than the current date.
* Next the program checks for the localities for which the user requires the pollution data and sends only those corrseponding localities' data if they are present in the filtered-out latest pollution data.
