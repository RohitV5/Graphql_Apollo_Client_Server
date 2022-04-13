install nodemon globallly
run => nodemon server
open playground at localhost 4000

apollo playground is similar to postman

install xampp for mysql and apache

 npm i -g prisma

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