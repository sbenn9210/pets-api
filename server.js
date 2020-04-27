var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
  {
    id: 1,
    name: "Adam",
    pets: [
      {
        id: 1,
        name: "Vera",
        type: "Dog",
      },
      {
        id: 2,
        name: "Felix",
        type: "Cat",
      },
    ],
  },
  {
    id: 2,
    name: "Kamilah",
    pets: [
      {
        id: 1,
        name: "Doug",
        type: "Dog",
      },
    ],
  },
];

// GET /api/owners

app.get("/api/owners", (req, res) => {
  res.send(owners);
});

// GET /api/owners/:id

app.get("/api/owners/:id", (req, res) => {
  let owner = owners.filter((person) => person.id == req.params.id);
  res.send(owner);
});

// POST /api/owners

app.post("/api/owners", (req, res) => {
  owners.push(req.body);
  res.send(owners);
});

// PUT /api/owners/:id

app.put("/api/owners/:id", (req, res) => {
  let updatedOwner = req.body;
  let updatedOwnersList = owners.map((owner) =>
    owner.id == req.params.id ? (owners[owner] = updatedOwner) : owner
  );
  res.send(updatedOwnersList);
});
// DELETE /api/owners/:id

app.delete("/api/owners/:id", (req, res) => {
  owners.pop(req.params.id);
  res.send(owners);
});

// GET /api/owners/:id/pets

app.get("/api/owners/:id/pets", (req, res) => {
  let pets = owners.map((owner) =>
    owner.id == req.params.id ? owner.pets : null
  );
  res.send(pets);
});

// GET /api/owners/:id/pets/:petId

app.get("/api/owners/:id/pets/:petId", (req, res) => {
  let ownerID = req.params.id;
  let petID = req.params.petId;
  let pet = owners.map((owner) => {
    if (owner.id == ownerID) {
      return owner.pets.filter((pet) => (pet.id == petID ? pet : null));
    }
  });

  res.send(pet);
});

// POST /api/owners/:id/pets

app.post("/api/owners/:id/pets", (req, res) => {
  let param = req.params.id;
  let petOwner = null;
  owners.map((owner) => {
    if (owner.id == param) {
      owner.pets.map((pet) => {
        if (pet.id == req.body.id) {
          return (petOwner = "This pet already exists");
        } else if (pet.id != req.body.id) {
          owner.pets.push(req.body);
          return (petOwner = owner);
        }
      });
    }
  });
  res.send(petOwner);
});

// PUT /api/owners/:id/pets/:petId
app.put("/api/owners/:id/pets/:petId", (req, res) => {
  let param = req.params.id;
  let petID = req.params.petId;
  owners.map((owner) => {
    if (owner.id == param) {
      owner.pets.map((pet) => {
        if (pet.id == petID) {
          owner.pets.splice(owner.pets.indexOf(pet), 1, req.body);
          res.send(owner);
        }
      });
    }
  });
});

// DELETE /api/owners/:id/pets/:petId

app.listen(3000, function () {
  console.log("Pets API is now listening on port 3000...");
});
