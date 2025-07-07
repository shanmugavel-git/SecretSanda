
# Secret Santa NodeJS

This is a simple Secret Santa assignment tool built with Node.js and Express.  

It reads participants from a CSV file and creates random assignments, ensuring:
- no one gets themselves
- results saved to a CSV
- assignment file can be downloaded via API

## 📦 Features

- Uses CSV for employee data
- Prevents assigning a participant to themselves
- Easily extendable
- Export to CSV


## 📂 Project Structure


/data
Employee-List.csv [input]
Secret-Santa-Game-Result-2023.csv [input]
Secret-Santa-Assignments [ouput file]
/controllers
santaController.js
/routes
santaRoutes.js
app.js  


## 🚀 Usage

1. Install dependencies:
In terminal, type below command from the folder zip extracted location
npm install


2. Start the server:

npm start

3. Make an assignment:

curl -X POST http://localhost:3000/santa/assign

Sample output (In TERMINAL):
---------------------------
{"Hamish Murray":"Matthew King","Layla Graham":"Charlie Ross","Matthew King":"Spencer Allen","Benjamin Collins":"Charlie Wright","Isabella Scott":"Piper Stewart","Charlie Ross":"Ethan Murray","Piper Stewart":"Layla Graham","Spencer Allen":"Benjamin Collins","Charlie Wright":"Mark Lawrence","Ethan Murray":"Hamish Murray","Mark Lawrence":"Hamish Murray"}

--------

Output file generated:
-- you can confirm the out put generated inside the folder 'data', with file name: Secret-Santa-Assignments.csv


--
Thank you.



