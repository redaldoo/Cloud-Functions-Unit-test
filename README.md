# Cloud-Functions-Unit-test

Version NodeJS >= 14.0.0

Products : [

GET (readAll) "/products" : cette requête permet de récuperer tout les produits
[ 
      {
        id: Number,
        name: String,
        image: String,
        category: String,
        price: Number,
        status: Boolean,
        richDescription: String,
        description: String,
        lng: Number,
        lat: Number,
        user: String
      }
]

POST (create) "/products" : cette requête permet de créer 
