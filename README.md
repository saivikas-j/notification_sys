# notification_sys

## Installation

Use Node version >= 18
Before running, add your email address and password in ./services/sendmail.ts file in the creation of the transporter
```
  npm install
  npm start
```

Make sure the pollution-service server is running before running it.<br/>
You can also modify index.ts to change the time at which the job is to run
   ```
   



## About

* This notification system interacts with the backend of the AirLifeGoa website. It gets the latest data of pollution for each station and each and every user's data. 
* The program then computes the AQI values for PM2.5 and PM10 for each station. 
* The program then checks that recorded date of the pollutants values' for each station and only considers the ones whose recorded date matches the current date on which the program is being run.
* After filtering out the current data, it iterates over each user who has subscribed to daily notifications and checks their last send date and considers only the ones whose last send date is atleast one less than the current date.
* Next the program checks for the localities for which the user requires the pollution data and sends only those corrseponding localities' data if they are present in the filtered-out latest pollution data, through nodemailer using handlebar templates.
* A job is scheduled running our main program every day.
