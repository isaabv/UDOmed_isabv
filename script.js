const materias = {
  "Primer semestre": {
    "Biología I": ["Biología II"],
    "Comprensión y expresión lingüística": ["Ciencias sociales"],
    "Desarrollo y destreza para el aprendizaje": [],
    "Extra académica cultural": [],
    "Extra académica deportiva": [],
    "Laboratorio de biología I": ["Laboratorio de biología II"],
    "Matemáticas I": ["Física médica", "Estadística general"],
    "Química general": ["Química orgánica"]
  },
  "Segundo semestre": {
    "Biología II": ["Bioquímica", "Embriología", "Anatomía I"],
    "Estadística general": ["Informática"],
    "Física médica": [],
    "Inglés instrumental agrobiologica": [],
    "Laboratorio de biología II": ["Anatomía I", "Embriología"],
    "Química orgánica": ["Bioquímica"],
    "Sociología de la salud": ["Ciencias sociales", "Itpp I"]
  },
  "Tercer semestre": {
    "Anatomía I": ["Anatomía II", "Itpp II"],
    "Ciencias sociales": ["Estadística"],
    "Embriología": ["Anatomía II", "Genética", "Psicología evolutiva"],
    "Itpp I": ["Itpp II"]
  },
  "Cuarto semestre": {
    "Anatomía II": ["Fisiología", "Histología"],
    "Bioquímica": ["Fisiología"],
    "Informática": ["Estadística"],
    "Itpp II": ["Itpp III"],
    "Psicología evolutiva": ["Psicología médica"]
  },
  "Quinto semestre": {
    "Estadística": ["Epidemiología general y saneamiento ambiental"],
    "Fisiología": ["Microbiología e inmunología clínica", "Psicología médica", "Fisiopatología", "Parasitología"],
    "Histología": ["Microbiología e inmunología clínica", "Fisiopatología", "Parasitología"],
    "Itpp III": ["Itpp IV"]
  },
  "Sexto semestre": {
    "Epidemiología general y saneamiento ambiental": ["Epidemiología especial"],
    "Itpp IV": [],
    "Microbiología e inmunología clínica": ["Anatomía patológica", "Semiología (medicina I)"],
    "Parasitología": ["Anatomía patológica", "Semiología (medicina I)"],
    "Psicología médica": ["Puericultura", "Psicopatología"]
  },
  "Séptimo semestre": {
    "Anatomía patológica": ["Cirugía I", "Ginecología y obstetricia I"],
    "Fisiopatología": ["Farmacología I", "Medicina II"],
    "Semiología (medicina I)": ["Cirugía I", "Ginecología y obstetricia I", "Puericultura", "Medicina II", "Psicopatología", "Genética"]
  },
  "Octavo semestre": {
    "Cirugía I": ["Cirugía II"],
    "Farmacología I": ["Farmacología II", "Pediatría I"],
    "Genética": [],
    "Ginecología y obstetricia I": ["Ginecología y obstetricia II"],
    "Puericultura": ["Pediatría I"]
  },
  "Noveno semestre": {
    "Farmacología II": ["Medicina III", "Pediatría II"],
    "Medicina II": ["Medicina III", "Imagenología"],
    "Pediatría I": ["Pediatría II"],
    "Psicopatología": ["Psiquiatría clínica"]
  },
  "Décimo semestre": {
    "Cirugía II": ["Medicina legal", "Cirugía III"],
    "Deontología médica": ["Administración médica"],
    "Epidemiología especial": ["Administración médica"],
    "Ginecología y obstetricia II": ["Medicina legal", "Ginecología y obstetricia III"],
    "Medicina III": ["Medicina IV"]
  },
  "Décimo primer semestre": {
    "Administración médica": [],
    "Imagenología": ["Cirugía III", "Medicina del trabajo"],
    "Medicina IV": ["Medicina V"],
    "Medicina legal": ["Psiquiatría clínica"],
    "Pediatría II": ["Pediatría III"]
  },
  "Décimo segundo semestre": {
    "Cirugía III": ["Cirugía IV"],
    "Historia de la medicina": [],
    "Medicina del trabajo": ["Pasantía rural"],
    "Medicina V": ["Medicina VI"],
    "Psiquiatría clínica": ["Higiene mental y psicoterapia"]
  },
    "Décimo tercer semestre": {
    "Cirugía IV": [],
    "Ginecología y obstetricia III": [],
    "Higiene mental y psicoterapia": [],
    "Medicina VI": [],
    "Pasantía rural": [],
    "Pediatría III": [],
    "Trabajo de grado": []
  },
  "Décimo cuarto semestre": {
    "Sepa Diosito": []
};

const estadoMaterias = {};

function crearMalla() {
  const contenedor = document.getElementById("malla");

  for (const [semestre, ramos] of Object.entries(materias)) {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";
    divSemestre.innerHTML = `<h2>${semestre}</h2>`;

    for (const ramo in ramos) {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo bloqueado";
      divRamo.textContent = ramo;
      divRamo.dataset.nombre = ramo;
      divRamo.onclick = () => aprobarRamo(ramo);
      divSemestre.appendChild(divRamo);
      estadoMaterias[ramo] = { aprobado: false, requisitos: [], desbloquea: ramos[ramo] };
    }

    contenedor.appendChild(divSemestre);
  }

  desbloquearIniciales();
}

function desbloquearIniciales() {
  for (const ramo in estadoMaterias) {
    const requisitos = Object.values(materias).flatMap(obj =>
      Object.entries(obj).filter(([nombre, desbloquea]) => desbloquea.includes(ramo)).map(([nombre]) => nombre)
    );
    estadoMaterias[ramo].requisitos = requisitos;

    if (requisitos.length === 0) {
      document.querySelector(`[data-nombre="${ramo}"]`).classList.remove("bloqueado");
    }
  }
}

function aprobarRamo(nombre) {
  const ramo = estadoMaterias[nombre];
  const div = document.querySelector(`[data-nombre="${nombre}"]`);

  if (div.classList.contains("bloqueado") || ramo.aprobado) return;

  ramo.aprobado = true;
  div.classList.add("aprobado");

  for (const desbloqueado of ramo.desbloquea) {
    const requisitos = estadoMaterias[desbloqueado].requisitos;
    const todosAprobados = requisitos.every(req => estadoMaterias[req]?.aprobado);
    if (todosAprobados) {
      document.querySelector(`[data-nombre="${desbloqueado}"]`).classList.remove("bloqueado");
    }
  }
}

crearMalla();
