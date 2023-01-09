Welcome to my project's documentation!
=====================================
# CRUD-Application-
CRUD Application With node.js in the contexe of smart university
   
## `Introduction`
We use CRUD apps every day. Most of the time, without noticing. They keep us organized, they help digitise business processes, and they’re critical to application development. But many of us are oblivious to what CRUD apps are, or how to build one. Within this project, I am going to explain what is a CRUD application and I will present to you an example of CRUD app and I will show you how to use it correctly.

### 1. What is a CRUD app?
A CRUD app is a specific type of software application that consists of four basic operations;

| Lettre | Function |
| ------ | -------- |
|   C    |  Create  |
|   R    |  Read    |
|   U    |  Update  |
|   D    |  Delete  |

#### Create:
Create allows you to add new rows/records to a database/table.
#### Read
Read is the operation that allows us to see the recipe we just created.
#### Update
Update is the operation that allows us to modify existing data and records within a table. 
#### Delete
Delete is the operation that allows us to remove records from a table.

### CRUD apps consist of three parts; the `database`, `user interface`, and `APIs/Backend`.
#### Database:
The database is where your data is stored.There are several different types of database; relational (SQL), Document (NoSQL).

#### User Interface:
The user interface (UI) is what your users interact with. 

#### Backend:
how your application informs your database of what functions to perform.

## 2. Example of a CRUD App:
### Problem:
As soon as I submitted my application to my university, I noticed that it has a soprtive infrastructure, digital infrastructures and workspaces, but it has a limited capacity so it is possible that you go to the university and you cannot find space and therefore you have to go to the security agent and make the reservation before one or two days. So as a web developement student, to solve this problem I decide to create an application which allows us, the students, to reserve the different resources of the university either the sports halls, or the sports fields, or the workspaces, or the computers.

let us discover this application and discover how to use it. 

### Solution 
The solution I propose is named uemf resources. which is a web application that allows uemf students to reserve any resource in one click.

Therefore, the programming of this web application will be carried out in Node js for several reasons like: run JavaScript in a single thread, and the processing is asynchronous...

Regarding my work environment, I work under windows, I use Visual Studio Code.

#### Database:
IN this project I created two schema or two models :
- *User*: it represent users of my app ![image](https://user-images.githubusercontent.com/75392302/210186881-839095fb-da44-4296-a163-e37e8001a807.png)
there is two types of user, we have setudents whose use app(request for a ressources) and we have admin who manage and control the app  
- *Demande*: which represent reservation request that users do.![image](https://user-images.githubusercontent.com/75392302/210186870-e8e26228-3c62-4dc8-b6f0-588ddffed28e.png)

#### User Interface:
UEMF resources is an application, which will be used by university students most of the time, so the application requires a graphics engine powerful front-end.

* Home page:![image](https://user-images.githubusercontent.com/75392302/210186676-c9860b09-67bb-4b36-8988-a2e9a3435a65.png)

* Regeter page:![image](https://user-images.githubusercontent.com/75392302/210186757-a28784b8-db85-4059-a170-75c0b27f310f.png)

* Login page:![image](https://user-images.githubusercontent.com/75392302/210186709-c042e7d6-56d2-40bc-8aca-f23bc22f86c8.png)

### If we log in as a simple user we have the following pages :

* Choose resource to request:  ![image](https://user-images.githubusercontent.com/75392302/210187018-70355b8f-9299-4609-9a39-8dad1c09da8a.png)
* Request for sports halls: ![image](https://user-images.githubusercontent.com/75392302/210187069-bed39050-28e4-4d1e-9f68-2cc0b865189e.png)![image](https://user-images.githubusercontent.com/75392302/210187274-66b8c9f8-744f-4a7a-ae99-d85f8b55b51d.png)

* Request for sports fields:![image](https://user-images.githubusercontent.com/75392302/210187130-4eef5109-a265-4788-9dbe-099aef0b1f97.png)
![image](https://user-images.githubusercontent.com/75392302/210187139-564d4609-7d3f-4c2b-bbe4-0560b9ecb982.png)

* Request for sports workspaces:![image](https://user-images.githubusercontent.com/75392302/210187153-a239780d-db9e-4af7-abb4-d39e4bb49915.png)
![image](https://user-images.githubusercontent.com/75392302/210187165-c5e607be-a7f5-4fde-82ff-bb442f3d583a.png)

* Request for sports computers:![image](https://user-images.githubusercontent.com/75392302/210187185-9510eb3f-3794-483b-8345-463a673f37ec.png)
![image](https://user-images.githubusercontent.com/75392302/210187202-b7964dce-0a26-4a7e-b8f0-d031fd54a861.png)

* About page:![image](https://user-images.githubusercontent.com/75392302/210187303-636c3a60-1135-463b-afc7-4276193879c5.png)

### Now if we log in as an admin user we have the following pages :
* List of requests:
*1. terrain:*![image](https://user-images.githubusercontent.com/75392302/210187474-de5a7b01-44e5-4b3b-a96a-dd8d70ce6c5d.png)

*2. salle sportive:*![image](https://user-images.githubusercontent.com/75392302/210187488-741cd6fa-6ccd-48b6-9ea0-87cb3b9a25ab.png)

*3. espace de travail:*![image](https://user-images.githubusercontent.com/75392302/210187494-4cb3ed76-3fbf-471b-af35-056805ece896.png)

*4. computer:*![image](https://user-images.githubusercontent.com/75392302/210187502-c29ef2a3-06bf-4a00-9dad-2ebc85ce32d4.png)
#### As we can see , the admin can validate a resevation or refuse it so we will have two other pages one the validated reservations and the other for the refused resevations.
*5. Demandes validées:*![image](https://user-images.githubusercontent.com/75392302/210187605-1fa48eba-48c0-49a2-a408-d2479b565ce4.png)
*6. Demandes rejetées:*![image](https://user-images.githubusercontent.com/75392302/210187617-4d1c5ddb-adbb-48c7-8c2d-881b8f8048ed.png)
### admin can also consulte the list of users 
*7. List of users:*![image](https://user-images.githubusercontent.com/75392302/210187688-2ab81078-745f-466b-9be7-aa9d1d23062a.png)


### Server/api:
This part concerns the routing for more details you can see the file app.js 

#### Create:
Allows you to add new account to users database.
Allows you to add new request a resource to demande database.

#### Read
Read is the operation that allows us to see the requests(demandes) we just created, 
Read is the operation that allows us to see the acounts we just created, 

#### Update
By default status of a request is "En Attente", When the admin validate a request(demande) we update the status to "Validée".
By default status of a request is "En Attente", When the admin reject a request(demande) we update the status to "Rejetée".

#### Delete
When a student cancel a request(demande).
When the admin remove a request(demande).

## `Summary`:
Currently my application allows me:
- Show tables:

*1. Requests of `Demandes validées of each catégory`*
*2. Requests of `terrain`*
*3. Requests of `espace de travail`*
*4. Request of `computer`*
*5. `Demandes validées` of each category *
*6. `Demandes rejetées` of each category*
*6. `List users`*
- Add an element in these tables
- Modify an element in these tables
- Delete an element in these tables

### I also add some features to my app :
#### 1. when the admin accept/refuse a request for a resource an email will send automatically to the student to inform him if he can get access to the resource or not ![image](https://user-images.githubusercontent.com/75392302/210188944-6ba5323a-f555-4d00-96a3-3d4a84efb9fa.png)

#### 2. when the student want to reserce a resouce that is not available at this time a message will be shown.![image](https://user-images.githubusercontent.com/75392302/210188364-e25d12a9-b5d5-4b4c-85ff-989861843c14.png)

#### 3. when a student enter false username or password an error will be shown also.![image](https://user-images.githubusercontent.com/75392302/210188413-9c6acd49-3d9c-46a4-a5f3-b2942d3e20b2.png)

#### 4. Also when a student want to choose a date he can see available ones and busy ones like this.![image](https://user-images.githubusercontent.com/75392302/210188658-310a93e9-c189-4e59-ad90-46421c69ec70.png)


`From a personal point of view`, this project allowed me to develop many
skills including new in web development and familiarize myself a little more with node js I learned a lot, both on the development part web, than on the database part. This experience will be an asset for the pursuit of my studies and for my professional career.

                                                                                                                            
                                                                  Thank you for your attention!
