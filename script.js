const ramos = {
  "Biología I": ["Biología II"],
  "Comprensión y expresión lingüística": ["Ciencias sociales"],
  "Desarrollo y destreza para el aprendizaje": [],
  "Extra académica cultural": [],
  "Extra académica deportiva": [],
  "Laboratorio de biología I": ["Laboratorio de biología II"],
  "Matemáticas I": ["Física médica", "Estadística general"],
  "Química general": ["Química orgánica"],
  "Biología II": ["Bioquímica", "Embriología", "Anatomía I"],
  "Estadística general": ["Informática"],
  "Física médica": [],
  "Inglés instrumental agrobiologica": [],
  "Laboratorio de biología II": ["Anatomía I", "Embriología"],
  "Química orgánica": ["Bioquímica"],
  "Sociología de la salud": ["Ciencias sociales", "Itpp I"],
  "Anatomía I": ["Anatomía II", "Itpp II"],
  "Ciencias sociales": ["Estadística"],
  "Embriología": ["Anatomía II", "Genética", "Psicología evolutiva"],
  "Itpp I": ["Itpp II"],
  "Anatomía II": ["Fisiología", "Histología"],
  "Bioquímica": ["Fisiología"],
  "Informática": ["Estadística"],
  "Itpp II": ["Itpp III"],
  "Psicología evolutiva": ["Psicología médica"],
  "Estadística": ["Epidemiología general y saneamiento ambiental"],
  "Fisiología": ["Microbiología e inmunología clínica", "Psicología médica", "Fisiopatología", "Parasitología"],
  "Histología": ["Microbiología e inmunología clínica", "Fisiopatología", "Parasitología"],
  "Itpp III": ["Itpp IV"],
  "Epidemiología general y saneamiento ambiental": ["Epidemiología especial"],
  "Itpp IV": [],
  "Microbiología e inmunología clínica": ["Anatomía patológica", "Semiología (medicina I)"],
  "Parasitología": ["Anatomía patológica", "Semiología (medicina I)"],
  "Psicología médica": ["Puericultura", "Psicopatología"],
  "Anatomía patológica": ["Cirugía I", "Ginecología y obstetricia I"],
  "Fisiopatología": ["Farmacología I", "Medicina II"],
  "Semiología (medicina I)": ["Cirugía I", "Ginecología y obstetricia I", "Puericultura", "Medicina II", "Psicopatología", "Genética"],
  "Cirugía I": ["Cirugía II"],
  "Farmacología I": ["Farmacología II", "Pediatría I"],
  "Genética": [],
  "Ginecología y obstetricia I": ["Ginecología y obstetricia II"],
  "Puericultura": ["Pediatría I"],
  "Farmacología II": ["Medicina III", "Pediatría II"],
  "Medicina II": ["Medicina III", "Imagenología"],
  "Pediatría I": ["Pediatría II"],
  "Psicopatología": ["Psiquiatría clínica"],
  "Cirugía II": ["Medicina legal", "Cirugía III"],
  "Deontología médica": ["Administración médica"],
  "Epidemiología especial": ["Administración médica"],
  "Ginecología y obstetricia II": ["Medicina legal", "Ginecología y obstetricia III"],
  "Medicina III": ["Medicina IV"],
  "Administración médica": [],
  "Imagenología": ["Cirugía III", "Medicina del trabajo"],
  "Medicina IV": ["Medicina V"],
  "Medicina legal": ["Psiquiatría clínica"],
  "Pediatría II": ["Pediatría III"],
  "Cirugía III": ["Cirugía IV"],
  "Historia de la medicina": [],
  "Medicina del trabajo": ["Pasantía rural"],
  "Medicina V": ["Medicina VI"],
  "Psiquiatría clínica": ["Higiene mental y psicoterapia"],
  "Cirugía IV": [],
  "Ginecología y obstetricia III": [],
  "Higiene mental y psicoterapia": [],
  "Medicina VI": [],
  "Pasantía rural": [],
  "Pediatría III": [],
  "Trabajo de grado": [],
  "Sepa Diosito": []
};

const estado = {};
const contenedor = document.getElementById("malla");

Object.keys(ramos).forEach(nombre => {
  estado[nombre] = false;
  const div = document.createElement("div");
  div.className = "ramo bloqueado";
  div.textContent = nombre;
  div.onclick = () => aprobarRamo(nombre);
  div.id = nombre.replace(/\s+/g, "_");
  contenedor.appendChild(div);
});

function desbloquearIniciales() {
  const iniciales = [
    "Biología I", "Comprensión y expresión lingüística", "Desarrollo y destreza para el aprendizaje",
    "Extra académica cultural", "Extra académica deportiva", "Laboratorio de biología I",
    "Matemáticas I", "Química general"
  ];
  iniciales.forEach(nombre => {
    document.getElementById(nombre.replace(/\s+/g, "_")).classList.remove("bloqueado");
  });
}

function aprobarRamo(nombre) {
  if (estado[nombre]) return;
  estado[nombre] = true;
  const div = document.getElementById(nombre.replace(/\s+/g, "_"));
  div.classList.add("aprobado");
  const desbloqueos = ramos[nombre];
  desbloqueos.forEach(r => {
    const ramoDiv = document.getElementById(r.replace(/\s+/g, "_"));
    ramoDiv.classList.remove("bloqueado");
  });
}

desbloquearIniciales();
