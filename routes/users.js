import express from "express";

import { updateUser, deleteUser, getUser, getAllUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/checkauth", verifyToken, (req, res, next) => {
    res.send("hello user, you are authenticated")
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("you are authenticated")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("welcome Admin you can delete all account!")
})
*/

//UPDATE
router.put('/:id', verifyUser, updateUser)

//DELETE
router.delete('/:id', verifyUser, deleteUser)

//GET
router.get('/:id', verifyUser, getUser)

//GET ALL
router.get('/', verifyAdmin, getAllUser)

export default router