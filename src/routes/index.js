import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "CherLock Please" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "Sobre CherLock Please" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contacte" });
});

export default router;
