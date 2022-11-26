var express = require("express");
var router = express.Router();
const Produit = require("../models/Produit");
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.render("auth");
// });
//Get all products
router.get("/", async function (req, res, next) {
  const products = await Produit.find({});
  res.render("products", { products });
});
// router.post("/auth", async function (req, res, next) {
//   try {
//     const { username, password } = req.body;
//     const checkIfUserExists = await userModel.findOne({
//       username: username,
//       password: password,
//     });
//     if (!checkIfUserExists) {
//       throw new Error("User not found");
//     }
//     res.redirect("http://localhost:3000/users/dashboard");
//   } catch (err) {
//     res.redirect("http://localhost:3000/users");
//   }
// });
router.get("/addProduct", async function (req, res, next) {
  res.render("addproduct");
});


// router.get('/updateproduct/:id',async function (req, res, next) {
//   const id = req.params.id ;
//   const updated = Produit.findById(id);
//   res.render("addproduct");
// } )


router.post("/addProduct", async function (req, res, next) {
  try {
    const { libelle, quantite, description, prix } = req.body;
    const checkIfProductExists = await Produit.findOne({
      Libelle: libelle,
    });
    if (checkIfProductExists) {
      res.send("Product already exists");
    } else {
      const newProduct = new Produit({
        Libelle: libelle,
        Description: description,
        Prix: prix,
        Quantite : quantite
      });
      await newProduct.save();
      res.redirect("http://localhost:3000/products");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  try {
    const { libelle, quantite, prix, description} = req.body
    const p = await Produit.findById(id);
    if (!p) {
      throw new Error('Error while updating product')
    }
    res.render("edit", { title: "Edit product", product: p });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get("/search", async function (req, res, next) {
  res.render("search");
});

router.post('/update/:id', async  (req, res) => {
  const { id } = req.params
  try {
    const { libelle, quantite, prix, description} = req.body
    console.log(libelle)
     await Produit.findByIdAndUpdate(id, {
      Libelle:libelle,Quantite: quantite,Prix: prix,Description: description
    })
    res.redirect('/products')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post("/search", async function (req, res, next) {
  try {
    const { email } = req.body;
    const checkIfUserExists = await userModel.findOne({
      email: email,
    });
    
    if (checkIfUserExists) {
      res.redirect(`http://localhost:3000/users/details/${checkIfUserExists.email}`);
    }
   
    
  } catch (err) {
    res.redirect("http://localhost:3000/users/search");
  }
});
router.get("/details/:email", async function (req, res, next) {
  const { email } = req.params;
  const user = await userModel.find({ email});

  res.render("details", { users: user });
});
router.get("/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  await Produit.findByIdAndDelete(id);
  res.redirect("http://localhost:3000/products");
});
module.exports = router;
