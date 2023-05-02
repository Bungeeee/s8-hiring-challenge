# Synpulse8 Hiring Challenge

## Challenge Description

 - https://challenges.synpulse8.com/front-end-engineer

## Product URL

 - Implement as a web application
 - https://sean-s8-hiring-challenge.web.app

## Development Tools & Dependencies

 - Frontend Framework
     - `React.js`
     - Dependencies
         - `react-router-dom`
         - `firebase`
         - `chart.js`
         - `react-chartjs-2`
         - `mui-tel-input`
         - `@mui/icons-material`
         - `algoliasearch`
         - `@algolia/autocomplete-js`
         - `@algolia/autocomplete-core`
         - `axios`
         - `react-share`
 - Data Porcess
     - `Python`
     - Packages
         - `pandas`
         - `json`
 - Deployment
     - `Firebase CLI`
     - setup
        ```shell
        firebase login
        firebase init
        ```
     - deploy
        ```shell
        yarn build
        firebase deploy
        ```

## Design & Planning

 - Main Requirements / Feature
     - Show in-time stock prices and history
     - Maintain Watch-list and show gain/loss information
     - Show lately related news
     - Login via phone number and OTP
### Page Breakdown

#### Login / Register

 - Input fields
    - Login
        - Phone number
            - National code + number
    - Register
        - Username
        - Phone number
            - National code + number

#### Dashboard

 - Blocks
     - Welcome message
     - Search box
     - Recommend or default display stocks

#### Watch List

 - Watched Item
     - Removed button attached

#### Personal Page

 - Avatar - `Editable`
 - Username - `Editable`
 - Link to watch-list

#### Stock Information

 - Stock symbol + name
 - Current gain/loss information
 - Trend graph
     - Displayed as candlestick chart
 - Buttons
     - Add to / remove from watch-list
     - Share via social media
 - News

### Development Process

#### Functions & Tools

 - User Data Maintainence
     - `Firebase`
         - Project build up
         - Login via phone functions
         - User data maintainence
             - Auth
                 - Name, UID, Number
                 - Firebase Authentication
             - Watchlist
                 - Document key: `UID`
                 - Firebase Firestore
             - Avatar
                 - Naming Logistic: `${UID}.png`
                 - Firebase Cloud Storage
     - `Material-UI Tel Input`
         - Phone number input with national code selections
 - Stock Information
     - `Alpha Vantage API`
         - Functions used
             - `TIME_SERIES_INTRADAY`
                 - get data of change of stock price in a trading day
                 - used for candlestick graph
             - `GLOBAL_QUOTE`
                 - get general data of a single stock
                 - open, close, high, low, and change from last close price
                 - used for general information displayed
             - `NEWS_SENTIMENT`
                 - get lately news related to declared tickers
                 - use for displaying news on stock page
    - `Chart.js`
        - candlestick chart build from bar chart
    - `react-share`
        - Share via Facebook & Twitter buttons
 - Search for stocks via tickers, common names
     - Data source
         - `Alpha Vantage`
             - `LISTING_STATUS`
                 - `listing_status.csv`
                 - get all active instruments
         - `NYSE`, `NASDAQ`
             - provide `.csv` file for symbol to company mapping
     - Process CSV files
         - Using `python` for processing
         - For Algolia index database
             - Type: `JSON`
             - Format:
                 ```json=
                    [
                        {
                            "symbol": "IBM",
                            "name": "International Business Machines"
                        },
                        ...
                    ]
                 ```
         - For Website referencing
             - Type: `JSON`
             - Format:
                 ```json=
                    {
                        "IBM": "International Business Machines",
                        ...
                    }
                 ```
     - Search Engine
         - `Algolia`
             - Autocomplete
             - Search result link to stock information page
             - URL format
                 - `https://sean-s8-hiring-challenge.web.app/stock-price/${symbol}`

 - Other Features
     - `Responsive Web Design (RWD)` applied to make website UI fit for users on all devices
     - OTP verification may also let non-registered user to directly login
         - Handled by assign a empty watch-list and null username when account created via login route
         - User can change peronal info later in the personal page

#### Supplementary Note

 - Alpha Vantage has API call limits on free plan
     - 5/min, 500/day
     - batch quotes API endpoint had been removed
     - Sacrifice
         - Display gain/loss information on each stock snippets on dashboard & watch list
             - May easily exceed 5 requests
         - Gain/loss overview on user's own portfolio
             - May easily exceed 5 requests
         - Options on daily, weekly, monthly movement of single stock price
             - With global quote, intrady, news as default, even 2 users request at the same time would exceed limit
     - Solution
         - Since if billing plan applied or more powerful API used, upon problems will be easily solved
             - Portable design for these extensive functionalities
         - If socket endpoint availible, in-time refreshment of stock price would be feasible
 - Share function
     - Current mechanism requires user to login to view informations
     - Maybe a new page for users not logged in with less information would be better for sharing
 - Now recommend stocks are set as default
     - Simply refer to official site of Nasdaq for April trade result 

### References & Credits

 - Firebase Documentation
     - https://firebase.google.com/docs
 - React Firebase Phone Auth
     - https://youtu.be/IivlA4o5RkU
 - Chat App using React and Firebase
     - Reference for user data maintainence
     - https://youtu.be/k4mjF4sPITE
 - ChartJS Series on Candlestick Chart
     - https://youtube.com/playlist?list=PLc1g3vwxhg1V4qjnG31zPs2WTvjCkDJHD
 - Alpha Vantage Documentation
     - https://www.alphavantage.co/documentation/
 - Algolia Documentation
     - https://www.algolia.com/doc/