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

router.get("/horaris", (req, res) => {
  res.render("horaris", { title: "Horaris de revisió" });
});

router.get("/carretons", (req, res) => {
  res.render("carretons", { title: "Estat carretons" });
});

router.get("/professorat", (req, res) => {
  res.render("professorat", { title: "Professorat" });
});

export default router;
