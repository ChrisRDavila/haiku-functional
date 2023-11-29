import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { checkHaiku } from "./js/haiku.js";

function handleHaiku(event) {
  event.preventDefault();
  document.querySelector("#response").innerText = null;
  const haiku = (document.querySelector("haiku").value);
  const response = checkHaiku(haiku);
  const pTag = document.createElement("p");
  pTag.append(`Is this a hiaku?: ${response}.`);
  document.querySelector("#response").append(pTag);
}

window.addEventListener("load", function () {
  document.querySelector("#haiku-checker").addEventListener("submit", handleHaiku);
});
