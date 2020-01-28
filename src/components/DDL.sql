CREATE TABLE estado (
  idEstado varchar(2) NOT NULL,
  dsEstado varchar(100) NOT NULL,
  PRIMARY KEY (idEstado)
);

CREATE SEQUENCE idCidade_seq;

CREATE TABLE cidade (
  idCidade integer NOT NULL DEFAULT nextval('idCidade_seq'),
  dsCidade varchar(60) NOT NULL,
  idEstado varchar(2) NOT NULL,
  PRIMARY KEY (idCidade),
  FOREIGN KEY (idEstado) REFERENCES estado (idEstado)
);

CREATE SEQUENCE idLocalidade_seq;

CREATE TABLE localidade (
  idLocalidade integer NOT NULL DEFAULT nextval('idLocalidade_seq'),
  dsLocalidade varchar(60) NOT NULL,
  idCidade integer NOT NULL,
  stComercio character(1),
  stPostoSaude character(1),
  stEscola character(1),
  stIgreja character(1),
  stCentroEspirita character(1),
  stBar character(1),
  PRIMARY KEY (idLocalidade),
  FOREIGN KEY (idCidade) REFERENCES cidade (idCidade)
);

CREATE SEQUENCE idResidencia_seq;

CREATE TABLE residencia (
	idResidencia integer NOT NULL DEFAULT nextval('idResidencia_seq'),
	idLocalidade integer NOT NULL,
	dsTipoConstrucao varchar(30),
	stBanheiro character(1),
    qtComodos integer,
    tpSaneamento varchar(30),
    stEnergia character(1),
    tpAgua varchar(30),
	PRIMARY KEY (idResidencia),
	FOREIGN KEY (idLocalidade) REFERENCES localidade (idLocalidade)
);

CREATE SEQUENCE idFamilia_seq;

CREATE TABLE familia (
	idFamilia integer NOT NULL DEFAULT nextval('idFamilia_seq'),
	idResidencia integer NOT NULL,
	qtFamilia integer,
	vlRendaFamilia varchar(30),
    dsFonteRenda varchar(30),
    stBolsaFamilia character(1),
    stCadastroUnicoFamilia character(1),
	PRIMARY KEY (idFamilia),
	FOREIGN KEY (idResidencia) REFERENCES residencia (idResidencia)
);

CREATE SEQUENCE idClifor_seq;

CREATE TABLE clifor (
	idClifor integer NOT NULL DEFAULT nextval('idClifor_seq'),
	idFamilia integer NOT NULL,
	dsClifor varchar(100),
    stResponsavel character(1),
	qtIdade integer,
	stSexo character(1),
    dsParentesco character(60),
    dsEstadoCivil character(60),
    dsReligiao character(60),
    dsOcupacao character(60),
    dsEscolaridade character(60),
    stLer character(1),
    stEscrever character(1),
    stDoenca character(1),
    dsDoenca character(60),
    dsSubstancia character(60),
    dsGostaAprender character(60),
	PRIMARY KEY (idClifor),
	FOREIGN KEY (idFamilia) REFERENCES familia (idFamilia)
);


INSERT INTO estado (idEstado, dsEstado) VALUES ('CE', 'Ceará')