import express from "express";


export function detailPageRouter() {
  const router = express.Router();

  router.get("/", (req, res) => {
    

    
    res.render("detailPage")
  });

  return router; 
}