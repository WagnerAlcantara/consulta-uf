const fs = require('fs');
const Promise = require('bluebird');

const escreverArquivo = Promise.promisify(fs.writeFile);
escreveEstadosPorCidades().then(() =>
  console.log('Acabou de escrever as cidades por estado')
);

function escreveEstadosPorCidades() {
  const estados = require('./Data/Estados.json');
  const cidades = require('./Data/Cidades.json');
  return Promise.map(estados, (estado) => {
    const cidadesDestaCidade = cidades.filter(
      (cidade) => estado.ID == cidade.Estado
    );
    estado.cidades = cidadesDestaCidade;

    return estado;
  }).each((estado) => {
    return escreverArquivo(
      `./Resultado/${estado.Sigla}.json`,
      JSON.stringify(estado.cidades)
    );
  });
}

console.log('Quantidade de cidades de TO:', quantidadeDeCidadePorEstado('TO'));

function quantidadeDeCidadePorEstado(UF) {
  return require(`./Resultado/${UF}.json`).length;
}

async function listarMaioresEstados() {
  let estados = require('./Data/Estados.json');
  const cidades = require('./Data/Cidades.json');
  estados = await Promise.map(estados, (estado) => {
    const cidadesDestaCidade = cidades.filter(
      (cidade) => estado.ID == cidade.Estado
    );
    estado.quantidadeCidades = cidadesDestaCidade.length;

    return estado;
  });

  estados = estados
    .sort(function (a, b) {
      if (a.quantidadeCidades < b.quantidadeCidades) {
        return 1;
      }
      if (a.quantidadeCidades > b.quantidadeCidades) {
        return -1;
      }
      return 0;
    })
    .map((estados) => `${estados.Sigla} - ${estados.quantidadeCidades}`)
    .splice(0, 5);
  return estados;
}

listarMaioresEstados().then((resultado) =>
  console.log('Maiores estados: ', resultado)
);

async function listarMenoresEstados() {
  let estados = require('./Data/Estados.json');
  const cidades = require('./Data/Cidades.json');
  estados = await Promise.map(estados, (estado) => {
    const cidadesDestaCidade = cidades.filter(
      (cidade) => estado.ID == cidade.Estado
    );
    estado.quantidadeCidades = cidadesDestaCidade.length;

    return estado;
  });

  estados = estados
    .sort(function (a, b) {
      if (a.quantidadeCidades > b.quantidadeCidades) {
        return 1;
      }
      if (a.quantidadeCidades < b.quantidadeCidades) {
        return -1;
      }
      return 0;
    })
    .map((estados) => `${estados.Sigla} - ${estados.quantidadeCidades}`)
    .splice(0, 5);
  return estados;
}

listarMenoresEstados().then((resultado) =>
  console.log('Menores estados:', resultado)
);

async function listarMaioresNomesDeCidadesPorEstados() {
  let estados = require('./Data/Estados.json');
  const cidades = require('./Data/Cidades.json');
  return await Promise.map(estados, (estado) => {
    const cidadesDesteEstado = cidades
      .filter((cidade) => estado.ID == cidade.Estado)
      .sort(function (a, b) {
        if (a.Nome.length < b.Nome.length) {
          return 1;
        }
        if (a.Nome.length > b.Nome.length) {
          return -1;
        }
        return 0;
      })
      .map((cidade) => cidade.Nome)
      .shift();

    return ` ${cidadesDesteEstado} - ${estado.Sigla}`;
  });
}

listarMaioresNomesDeCidadesPorEstados().then((resultado) =>
  console.log('Maiores nomes de cidade por estados:', resultado)
);

async function listarMenoresNomesDeCidadesPorEstados() {
  let estados = require('./Data/Estados.json');
  const cidades = require('./Data/Cidades.json');
  return await Promise.map(estados, (estado) => {
    const cidadesDesteEstado = cidades
      .filter((cidade) => estado.ID == cidade.Estado)
      .sort(function (a, b) {
        if (a.Nome.length > b.Nome.length) {
          return 1;
        }
        if (a.Nome.length < b.Nome.length) {
          return -1;
        }
        return 0;
      })
      .map((cidade) => cidade.Nome)
      .shift();

    return ` ${cidadesDesteEstado} - ${estado.Sigla}`;
  });
}

listarMenoresNomesDeCidadesPorEstados().then((resultado) =>
  console.log('Menores nomes de cidade por estados:', resultado)
);

async function listarMaiorNomeDeCidadesEntreEstados() {
  let estados = require('./Data/Estados.json');
  const cidades = require('./Data/Cidades.json');
  return (
    await Promise.map(estados, (estado) => {
      const cidadesDesteEstado = cidades
        .filter((cidade) => estado.ID == cidade.Estado)
        .sort(function (a, b) {
          if (a.Nome.length < b.Nome.length) {
            return 1;
          }
          if (a.Nome.length > b.Nome.length) {
            return -1;
          }
          return 0;
        })
        .map((cidade) => cidade.Nome)
        .shift();

      return ` ${cidadesDesteEstado} - ${estado.Sigla}`;
    })
  )
    .sort(function (a, b) {
      if (a.length < b.length) {
        return 1;
      }
      if (a.length > b.length) {
        return -1;
      }
      return 0;
    })
    .shift();
}

listarMaiorNomeDeCidadesEntreEstados().then((resultado) =>
  console.log('Maior Nome de cidade entre os estados:', resultado)
);

async function listarMenorNomeDeCidadesEntreEstados() {
  let estados = require('./Data/Estados.json');
  const cidades = require('./Data/Cidades.json');
  return (
    await Promise.map(estados, (estado) => {
      const cidadesDesteEstado = cidades
        .filter((cidade) => estado.ID == cidade.Estado)
        .sort(function (a, b) {
          if (a.Nome.length > b.Nome.length) {
            return 1;
          }
          if (a.Nome.length < b.Nome.length) {
            return -1;
          }
          return 0;
        })
        .map((cidade) => cidade.Nome)
        .shift();

      return ` ${cidadesDesteEstado} - ${estado.Sigla}`;
    })
  )
    .sort(function (a, b) {
      if (a.length > b.length) {
        return 1;
      }
      if (a.length < b.length) {
        return -1;
      }
      return 0;
    })
    .shift();
}

listarMenorNomeDeCidadesEntreEstados().then((resultado) =>
  console.log('Menor Nome de cidade entre os estados:', resultado)
);
