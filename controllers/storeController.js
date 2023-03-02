const asyncHandler = require("express-async-handler");
const Store = require("../models/storeModel");
const User = require("../models/userModel");
const fs = require("fs");
const defaultStorePic = "2023-01-07T10-36-04.855Zstore.jpg";

//@desc Get all stores
//@route GET /api/stores
//@acces Public
const getStores = asyncHandler(async (req, res) => {
  const stores = await Store.find();
  res.status(200).json(stores);
});

//@desc Get public store information
//@route GET /api/stores/:id
const getStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  res.status(200).json(store);
});

//@desc Get my store information
//@route GET /api/store/mine/:id
const getMyStore = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await Store.findOne({ owner: id });
  //const store = null
  //const user = await User.findById(req.user.id)

  if (store) {
    res.status(200).json(store);
  } else {
    res.status(404).json({});
  }
});

//@desc Update my store information
//@route PATCH /api/store/mine/:id
const updateStore = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const store = await Store.findOne({ owner: id });

  if (!store) {
    res.status(401);
    throw new Error("Store not found");
  }

  // let storePicture;
  // if (req.file) {
  //   storePicture = req.file.filename;
  // } else {
  //   storePicture = defaultStorePic;
  // }

  const updatedStore = await Store.findByIdAndUpdate(
    store.id,
    {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      ...((req.file !== undefined) && {
        storeImg: {
          data: fs.readFileSync("uploads/stores/" + req.file.filename),
          contentType: "image/png",
        },
      }),
    },
    { new: true }
  );

  if (JSON.stringify(updatedStore) === "{}") {
    res.status(404).json({});
  } else {
    res.status(200).json({
      _id: updatedStore.id,
      name: updatedStore.name,
      address: updatedStore.address,
      description: updatedStore.description,
      storeImg: updatedStore.storeImg,
      owner: updatedStore.owner,
      body: req.file
    });
  }
});

// @desc Create Store
// @route POST /api/stores
// @access Private
const createStore = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Prease add a name for store");
  }

  let description;
  description = req.body.description === "";

  if (req.body.description === "" || req.body.description === undefined) {
    description = "";
  } else {
    description = req.body.description;
  }

  let storePicture;
  if (req.file) {
    storePicture = req.file.filename;
  } else {
    storePicture = defaultStorePic;
  }

  const store = await Store.create({
    name: req.body.name,
    description: description,
    address: req.body.address,
    storeImg: {
      data: fs.readFileSync("uploads/stores/" + storePicture),
      contentType: "image/png",
    },
    owner: req.user.id.toString(),
  });

  res.status(200).json(store);
});

// @desc Update store
// @route PUT /api/stores/:id
// @access Private
// const updateStore = asyncHandler(async (req, res) => {
//     const store = await Store.findById(req.params.id)

//     const user = await User.findById(req.user.id)

//     //Verify if store exists
//     if(!store) {
//         res.status(400)
//         throw new Error('Store not found')
//     }

//     //Check for user
//     if(!user) {
//         res.status(401)
//         throw new Error('User not found')
//     }

//     //Make sure the logged user maches the store user
//     if(store.owner.toString() !== user.id) {
//         res.status(401)
//         throw new Error('User not authorized')
//     }

//     const updatedStore = await Store.findByIdAndUpdate(req.params.id,
//         req.body, {
//             new: true,
//         })

//     res.status(200).json(updatedStore)
// })

const deleteStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    res.status(400);
    throw new Error("Store not found");
  }

  await store.remove();
  res.status(200).json({ id: req.params.id });
});

const changeStatus = asyncHandler(async (req, res) => {

  if(req.user.role === 'admin') {
    const userChanged = await Store.findByIdAndUpdate(
      req.params.id,
      {
        active: req.body.active,
      },
    );
  
    res.status(200).json(userChanged);
  } else {
    res.status(401).json({message: 'Your role can be changed only by another admin.'})
  }

});

module.exports = {
  getStores,
  getStore,
  getMyStore,
  createStore,
  updateStore,
  deleteStore,
  changeStatus
};
