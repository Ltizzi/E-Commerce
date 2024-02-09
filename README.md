# **E-Commerce**

**Summary**

An e-commerce made with **Node/Express** and **Angular**.

The API is a node/express server wrote in **TypeScript**. It use a **PostgreSQL** database and **TypeOrm** for express-db connection. It has a **Oauth2** authentication with Google (with **Passport**) and use **JWT** for stateless authorization.

The client is an Angular project powered by **TailwindCSS** and a few **Flowbite**, **Tailblocks** and **HyperUI** components.

**Instalation**

Just clone the repo. The project is a single folder with 'Web' and 'Server' subfolders.

To run the API just use:

```
cd Server
npm install
npm run dev
```

and for the Client:

```
cd Web
npm install
ng serve
```
