Samuel Daly 101000154
Darren Pierre 101015833


Version: tested on MacOS and Windows
	 Node.js version --> 9.7.1

Install: npm install (This will install the modules necessary to run the code)

Launch: node start

Testing: To test, you can visit these following link:http://localhost:3000

To run this app you need a personal Paypal Account
You can create on at paypal.com
When you create the account you don't need to link a credit card or bank account at that
time. I just ignored that step when prompted and it created the account anyway. I received confirmation by email.

1) Changing paypal account
Visit app.js file then change client_id and client_secret with your
paypal sandbox account.

You can create a sandbox account from below link
https://developer.paypal.com/

3) Setup project
Before starting application please run the populate-for-startup.js
file inside the seed directory to populate the mongodb database.
You can basically run the file with below command (after locating in the terminal)
node populate-for-startup.js

Install the npm module depedencies in package.json by exectuing:
npm install

4) Run the application
In the application folder execute:
npm start
then you can access from localhost at
http://localhost:3000

5) Login to the app using the dummy user for project:
username : admin@admin.com
password : admin

username    : 'd-pierre90@hotmail.com',
password    : '1234',

username    : 'ta@testing.com',
password    : 'carleton18',


5) Important
Before starting application please make sure your mongo database runs.

6) Features
Add product
Delete product
Update product
Buy item
Shopping cart
Order history
Multiple search with comma => itemName,ItemName2
Filters
