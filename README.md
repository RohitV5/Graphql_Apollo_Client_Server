install nodemon globallly
run => nodemon server2   
open playground at [localhost 4000](http://localhost:4000/graphql)

apollo playground is similar to postman

install xampp for mysql and apache

 npm i -g prisma

//To create database tables
[
 npx prisma migrate dev --name init_migration

or

 npx prisma db push   //worked fine
]

//check phpmyadmin or tool made by prisma npx prisma studio



after updating prisma models run => prisma db push


we can use graphquery api without any library by using fetch api call.
graphql post is always a post request.

just copy the query from graphql apollo gui and pass in request body

`
fetch("http://localhost:3000,{
    method:"POST",
    header:{
        "Content-type":"application/json"
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0OTUwNjE3NH0.2u5aPTjJrPHDTd13xlptZvZRxUhuJUH7O4ZSERBeX2k"
    },
    body:JSON.stringify({
        query:`
            query MessagesByUser($receiverId: Int!) {
                messagesByUser(receiverId: $receiverId) {
                    text
                    receiverId
                    senderId
                }
            }
        `,
        variables:{            
            "receiverId": 2
        }
    })
}).then(res=>res.json())
.then(data=>{
    console.log(data)
})
`

Install Apollo Cmd 5.6.10 is not compatible with react 18 due to peer dependecies
npm i --legacy-peer-deps @apollo/client








How to run server
==========
nodemon server


How to run client
===========
inside client  node start


Run XAMPP  Apache and MySQL
==========================
open http://localhost/phpmyadmin/ for database access


Inside graphql apollo running at 4000 

under mutation signIn and get the token
after signing in get the token and attach in subsequent request in the header Authorization.


Some common creds 
zango1@gmail.com/rohit
zango2@gmail.com/rohit



Note:

GraphQL Subscriptions do not work with apollo-server default package
It uses apollo-sever-express which uses web socket to create 2 way functionality.
And For that we need to add a package.
https://github.com/enisdenjo/graphql-ws

For Apollo server implementation checkout branch apollo-server
For Apollo server express subscription package checkout branch apollo-server-express ws

Cmd for subscription packages 
npm install apollo-server-express graphql-ws @graphql-tools/schema express

Also

Server.js has Apollo server implementation
Server2.js has Apollo server express implementation





