import axios from "axios";

export const baseURL = "http://localhost:3001"

export var back = axios.create({
  baseURL
})


export var departamentos = [
  { name: "Burruyacú", value: "Burruyacú" },
  { name: "Capital", value: "Capital" },
  { name: "Cruz Alta", value: "Cruz Alta" },
  { name: "La Cocha", value: "La Cocha" },
  { name: "Chicligasta", value: "Chicligasta" },
  { name: "Famaillá", value: "Famaillá" },
  { name: "Graneros", value: "Graneros" },
  { name: "Juan Bautista Alberdi", value: "Juan Bautista Alberdi" },
  { name: "Leales", value: "Leales" },
  { name: "Lules", value: "Lules" },
  { name: "Monteros", value: "Monteros" },
  { name: "Río Chico", value: "Río Chico" },
  { name: "Simoca", value: "Simoca" },
  { name: "Tafí del Valle", value: "Tafí del Valle" },
  { name: "Tafí Viejo", value: "Tafí Viejo" },
  { name: "Trancas", value: "Trancas" },
  { name: "Yerba Buena", value: "Yerba Buena" }
]