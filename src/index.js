const readXlsxFile = require('read-excel-file/node');
const Banco = require('./components/database');

async function teste() {
  const rows = await readXlsxFile("C:/Users/guilh/Documents/JS/Estágio/pasta1.xlsx")

  await Banco.connect();

  for (let i = 1; i < rows.length; i++) {
    console.log(rows[i][1]);
    let idCidade = await Banco.query(`SELECT idCidade FROM cidade WHERE dsCidade = '${rows[i][1]}'`);

    if (idCidade.rows.length === 0) {
      await Banco.query(`INSERT INTO cidade (dsCidade, idEstado) VALUES ('${rows[i][1]}', 'CE')`);
      idCidade = await Banco.query(`SELECT idCidade FROM cidade WHERE dsCidade = '${rows[i][1]}' AND idEstado = 'CE'`)
    }

    let idLocalidade = await Banco.query(`SELECT idLocalidade FROM localidade WHERE dsLocalidade = '${rows[i][2]}'`)

    if (idLocalidade.rows.length === 0) {
      await Banco.query(`INSERT INTO localidade (idCidade,
                                                 dsLocalidade, 
                                                 stComercio, 
                                                 stPostoSaude,
                                                 stEscola,
                                                 stIgreja,
                                                 stCentroEspirita,
                                                 stBar) 
                                         VALUES (${idCidade.rows[0].idcidade},
                                                 '${rows[i][2]}',
                                                 '${rows[i][164] === 'Sim' ? 'S' : 'N'}',
                                                 '${rows[i][165] === 'Sim' ? 'S' : 'N'}',
                                                 '${rows[i][166] === 'Sim' ? 'S' : 'N'}',
                                                 '${rows[i][167] === 'Sim' ? 'S' : 'N'}',
                                                 '${rows[i][168] === 'Sim' ? 'S' : 'N'}',
                                                 '${rows[i][168] === 'Sim' ? 'S' : 'N'}')`);

      idLocalidade = await Banco.query(`SELECT idLocalidade FROM localidade WHERE dsLocalidade = '${rows[i][2]}' AND idCidade = ${idCidade.rows[0].idcidade}`);
    }
    await Banco.query(`INSERT INTO residencia (idLocalidade,
                                              dsTipoConstrucao,
                                              stBanheiro,
                                              qtComodos,
                                              tpSaneamento,
                                              stEnergia,
                                              tpAgua)
                                      VALUES (${idLocalidade.rows[0].idlocalidade},
                                              '${rows[i][158]}',
                                              '${rows[i][159] === 'Sim' ? 'S' : 'N'}',
                                              ${rows[i][160]},
                                              '${rows[i][161]}',
                                              '${rows[i][162] === 'Sim' ? 'S' : 'N'}',
                                              '${rows[i][163]}')`);

    const idResidencia = await Banco.query('SELECT MAX(idResidencia) FROM residencia');

    await Banco.query(`INSERT INTO familia (idResidencia,
                                            qtFamilia,
                                            vlRendaFamilia,
                                            dsFonteRenda,
                                            stBolsaFamilia,
                                            stCadastroUnicoFamilia)
                                    VALUES (${idResidencia.rows[0].max},
                                            ${rows[i][3]},
                                            '${rows[i][4]}',
                                            '${rows[i][5]}',
                                            '${rows[i][6] === 'Sim' ? 'S' : 'N'}',
                                            '${rows[i][7] === 'Sim' ? 'S' : 'N'}')`);

    const idFamilia = await Banco.query('SELECT MAX(idFamilia) FROM familia');

    //individuo 1
    await Banco.query(`INSERT INTO clifor (idFamilia,
                                          dsClifor,
                                          stResponsavel,
                                          qtIdade,
                                          stSexo,
                                          dsParentesco,
                                          dsEstadoCivil, 
                                          dsReligiao,    
                                          dsOcupacao,      
                                          dsEscolaridade,  
                                          stLer,           
                                          stEscrever,      
                                          stDoenca,        
                                          dsDoenca,        
                                          dsSubstancia,    
                                          dsGostaAprender) 
                                  VALUES (${idFamilia.rows[0].max},
                                          '${rows[i][8]}',
                                          '${rows[i][9] === 'Sim' ? 'S' : 'N'}',
                                          ${rows[i][10]},
                                          '${rows[i][11] === 'Masculino' ? 'M' : 'F'}',
                                          '${rows[i][12]}',
                                          '${rows[i][13]}',
                                          '${rows[i][14]}',
                                          '${rows[i][15]}',
                                          '${rows[i][16]}',
                                          '${rows[i][17].search('Ler') === 0 ? 'S' : 'N'}',
                                          '${rows[i][17].search('Escrever') === 0 || rows[i][17].search('Escrever') === 5 ? 'S' : 'N'}',
                                          '${rows[i][18] === 'Sim' ? 'S' : 'N'}',
                                          '${rows[i][19] ? rows[i][19] : 'Nenhuma'}',
                                          '${rows[i][20] ? rows[i][20] : 'Nenhuma'}',
                                          '${rows[i][21]}')`);
    //individuo 2
    if (rows[i][22] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][23]}',
                                      '${rows[i][24] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][25]},
                                      '${rows[i][26] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][27]}',
                                      '${rows[i][28]}',
                                      '${rows[i][29]}',
                                      '${rows[i][30]}',
                                      '${rows[i][31]}',
                                      '${rows[i][32].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][32].search('Escrever') === 0 || rows[i][32].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][33] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][34] ? rows[i][34] : 'Nenhuma'}',
                                      '${rows[i][35] ? rows[i][35] : 'Nenhuma'}',
                                      '${rows[i][36]}')`);
    }
    //individuo 3
    if (rows[i][37] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][38]}',
                                      '${rows[i][39] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][40]},
                                      '${rows[i][41] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][42]}',
                                      '${rows[i][43]}',
                                      '${rows[i][44]}',
                                      '${rows[i][45]}',
                                      '${rows[i][46]}',
                                      '${rows[i][47].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][47].search('Escrever') === 0 || rows[i][47].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][48] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][49] ? rows[i][49] : 'Nenhuma'}',
                                      '${rows[i][50] ? rows[i][50] : 'Nenhuma'}',
                                      '${rows[i][51]}')`);
    }
    //individuo 4
    if (rows[i][52] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][53]}',
                                      '${rows[i][54] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][55]},
                                      '${rows[i][56] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][57]}',
                                      '${rows[i][58]}',
                                      '${rows[i][59]}',
                                      '${rows[i][60]}',
                                      '${rows[i][61]}',
                                      '${rows[i][62].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][62].search('Escrever') === 0 || rows[i][62].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][63] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][64] ? rows[i][67] : 'Nenhuma'}',
                                      '${rows[i][65] ? rows[i][65] : 'Nenhuma'}',
                                      '${rows[i][66]}')`);
    }
    //individuo 5
    if (rows[i][67] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][68]}',
                                      '${rows[i][69] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][70]},
                                      '${rows[i][71] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][72]}',
                                      '${rows[i][73]}',
                                      '${rows[i][74]}',
                                      '${rows[i][75]}',
                                      '${rows[i][76]}',
                                      '${rows[i][77].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][77].search('Escrever') === 0 || rows[i][77].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][78] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][79] ? rows[i][79] : 'Nenhuma'}',
                                      '${rows[i][80] ? rows[i][80] : 'Nenhuma'}',
                                      '${rows[i][81]}')`);
    }
    //individuo 6
    if (rows[i][82] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][83]}',
                                      '${rows[i][84] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][85]},
                                      '${rows[i][86] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][87]}',
                                      '${rows[i][88]}',
                                      '${rows[i][89]}',
                                      '${rows[i][90]}',
                                      '${rows[i][91]}',
                                      '${rows[i][92].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][92].search('Escrever') === 0 || rows[i][92].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][93] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][94] ? rows[i][94] : 'Nenhuma'}',
                                      '${rows[i][95] ? rows[i][95] : 'Nenhuma'}',
                                      '${rows[i][96]}')`);
    }
    //individuo 7
    if (rows[i][97] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][98]}',
                                      '${rows[i][99] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][100]},
                                      '${rows[i][101] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][102]}',
                                      '${rows[i][103]}',
                                      '${rows[i][104]}',
                                      '${rows[i][105]}',
                                      '${rows[i][106]}',
                                      '${rows[i][107].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][107].search('Escrever') === 0 || rows[i][107].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][108] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][109] ? rows[i][109] : 'Nenhuma'}',
                                      '${rows[i][110] ? rows[i][110] : 'Nenhuma'}',
                                      '${rows[i][111]}')`);
    }
    //individuo 8
    if (rows[i][112] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][113]}',
                                      '${rows[i][114] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][115]},
                                      '${rows[i][116] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][117]}',
                                      '${rows[i][118]}',
                                      '${rows[i][119]}',
                                      '${rows[i][120]}',
                                      '${rows[i][121]}',
                                      '${rows[i][122].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][122].search('Escrever') === 0 || rows[i][122].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][123] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][124] ? rows[i][124] : 'Nenhuma'}',
                                      '${rows[i][125] ? rows[i][125] : 'Nenhuma'}',
                                      '${rows[i][126]}')`);
    }
    //individuo 9
    if (rows[i][127] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][128]}',
                                      '${rows[i][129] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][130]},
                                      '${rows[i][132] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][132]}',
                                      '${rows[i][133]}',
                                      '${rows[i][134]}',
                                      '${rows[i][135]}',
                                      '${rows[i][136]}',
                                      '${rows[i][137].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][137].search('Escrever') === 0 || rows[i][137].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][138] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][139] ? rows[i][139] : 'Nenhuma'}',
                                      '${rows[i][140] ? rows[i][140] : 'Nenhuma'}',
                                      '${rows[i][141]}')`);
    }
    //individuo 10
    if (rows[i][142] === 'Sim') {
      await Banco.query(`INSERT INTO 
                              clifor (idFamilia,
                                      dsClifor,
                                      stResponsavel,
                                      qtIdade,
                                      stSexo,
                                      dsParentesco,
                                      dsEstadoCivil, 
                                      dsReligiao,    
                                      dsOcupacao,      
                                      dsEscolaridade,  
                                      stLer,           
                                      stEscrever,      
                                      stDoenca,        
                                      dsDoenca,        
                                      dsSubstancia,    
                                      dsGostaAprender) 
                              VALUES (${idFamilia.rows[0].max},
                                      '${rows[i][143]}',
                                      '${rows[i][144] === 'Sim' ? 'S' : 'N'}',
                                      ${rows[i][145]},
                                      '${rows[i][146] === 'Masculino' ? 'M' : 'F'}',
                                      '${rows[i][147]}',
                                      '${rows[i][148]}',
                                      '${rows[i][149]}',
                                      '${rows[i][150]}',
                                      '${rows[i][151]}',
                                      '${rows[i][152].search('Ler') === 0 ? 'S' : 'N'}',
                                      '${rows[i][152].search('Escrever') === 0 || rows[i][152].search('Escrever') === 5 ? 'S' : 'N'}',
                                      '${rows[i][153] === 'Sim' ? 'S' : 'N'}',
                                      '${rows[i][154] ? rows[i][154] : 'Nenhuma'}',
                                      '${rows[i][155] ? rows[i][155] : 'Nenhuma'}',
                                      '${rows[i][156]}')`);
    }
  }
  await Banco.disconnect();
}

teste();