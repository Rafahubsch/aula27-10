
const form = document.querySelector("#form-serie");

const resposta = document.querySelector("#resposta");

const apiKey = "cv_ezT6F85MgBCUU5HhUYCFsMtu_vROD-Skr0PMCazvs7tZHJomkXPrwMSida5n3pjr";

const apiUrl = "https://api-ds.codeverse.dev.br/api/series";

form.addEventListener("submit", async function (event) {
  


  const dados =  new FormData(form);


  const heroi = {
      title: dados.get("title"),
      genero: dados.get("genero"),
      numero_temporadas: dados.get("numero_temporadas"),
      ano_lancamento: dados.get("ano_lancamento"),
      plataforma: dados.get("plataforma"),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando heroi para a API....";


try {

  const respostaApi = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },



    body: JSON.stringify(heroi),
  });

  const texto = await respostaApi.text();
  let resultado;

  try {
    resultado = texto ? JSON.parse(texto) : {};
  } catch (error) {
    resultado = error;
    return;
  }

  if(respostaApi.ok){
    resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
    form.reset();
  }
  
} catch (error) {
  console.error(error);
}

})