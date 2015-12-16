$(function() {

    // Coleção que ira receber as notas de todas as materias
    var entityCollection = [];

    // Define a media anual para cada bimestre.
    var mediaTotal = {
        bin1: 0,
        bin2: 0,
        bin3: 0,
        bin4: 0
    };

    // Tabela das notas (a quarta!)
    var $table = $("table:eq(3)");
    // Percorre todas as colunas, cada coluna é um bimestre
    $table.find('tr:gt(0)').each(function(k, j) {

        // Cria um objeto vazio para gravar as notas dessa materia
        var entity = {};
        $tr = $(this);

        // Salva o nome da materia
        entity.name = $tr.find("td:eq(0)").text();
        // Salva o elemento da materia
        entity.element = $(this);


            // helper para obter a nota a partir da coluna (caso - trasforma em undefined).
        var getNote = function(position) {
            return ($tr.find('td:eq('+ position +')').text() != '-') ? parseFloat($tr.find('td:eq('+ position +')').text()) : undefined;
        };

        entity.notes = {
            bin1: {
                element: $tr.find('td:eq(1)'), // Elemento
                note: getNote(1) // A nota
            },
            subBin1: {
                element: $tr.find('td:eq(3)'),
                note: getNote(3)
            },
            bin2: {
                element: $tr.find('td:eq(2)'),
                note: getNote(2)
            },
            subBin2: {
                element: $tr.find('td:eq(4)'),
                note: getNote(4)
            },
            bin3: {
                element: $tr.find('td:eq(5)'),
                note: getNote(5)
            },
            subBin3: {
                element: $tr.find('td:eq(7)'),
                note: getNote(7)
            },
            bin4: {
                element: $tr.find('td:eq(6)'),
                note: getNote(6)
            },
            subBin4: {
                element: $tr.find('td:eq(8)'),
                note: getNote(8)
            }
        };

        // Adiciona essa materia na collection
        entityCollection.push(entity);
    });


    // Funcao calcula e determina a media de cada materia, adicionando na coluna
    function determineMedia(entity, total, notes) {
        var result = total - 24.0; // Calcula o quanto falta para media
        var divide = (notes > 0) ? notes : 0; // Define o divisor
        var toPass = result / ( 4 - divide ); // Divide o divisor pelo que falta, para definir quantos falta passar em cada bimestre
        var color = (toPass > 0) ? 'green' : 'red'; // Define uma cor, verde para exesso ou vermelho para falta.

        if(Math.abs(toPass) > 10.0 && toPass < 0) {  // Verifica se absoluto é maior que cem e a nota é negativa
            entity.element.css('background', '#F75D59'); // Descata a linha de vermelho
            color = 'white';
        } else if(toPass > 0) {  // Verifica se a nota é positiva
            entity.element.css('background', '#59E817'); // Destaca a linha de verde
            color = 'black';
        }

        var entity = entity.notes; // Helper :)

        toPass = Math.abs(toPass).toFixed(1); // Transforma o numero em absoluto e com uma casa decimal
        var changeNote = function(bin) {
            entity[bin].element.html(toPass).css('color', color);   // helper
        };




        subBin1 = entity.subBin1.note;
        subBin2 = entity.subBin2.note;
        if(notes > 2 && notes < 4) { // Se esta no terceiro bimestre, calcular o que precisa para sub
            if(subBin1 !== undefined && subBin2 !== undefined) { // se ja nao definido
                alert("Ainda não calcula o valor que você precisa para sub, em breve!");
            }
        }



        subBin3 = entity.subBin3.note;
        subBin4 = entity.subBin4.note;
        if(notes >= 4) { // Se esta no quarto bimestre, define os valores da sub
            if(subBin3 !== undefined && subBin4 !== undefined) {
                alert("Ainda não calcula o valor que você precisa para sub, em breve!");
            }
        }


        for(i=notes+1;i<4;i++) {
            changeNote( "bin" + i ); // usa o helper para todos os bimestre
        }
    }
    // Adiciona o titulo de media final
    $table.find('tr:eq(0)').append("<td class='font01n' style='font:bold 12px Arial'>TOTAL</td>");


    // percorre todas as notas
    $.each(entityCollection, function(index, value) {
       var bin1 = value.notes.bin1.note;
       var bin2 = value.notes.bin2.note;
       var subBin1 = value.notes.subBin1.note;
       var subBin2 = value.notes.subBin2.note;

       var bin3 = value.notes.bin3.note;
       var bin4 = value.notes.bin4.note;
       var subBin3 = value.notes.subBin3.note;
       var subBin4 = value.notes.subBin4.note;


       var total, notes;

       // Trocar a nota do bin pela sub
       if(bin2 !== undefined) {
           if(subBin1 !== undefined) {
               if(subBin1 > bin1) bin1 = subBin1;
           }

           if(subBin2 !== undefined) {
               if(subBin2 > bin2) bin2 = subBin2;
           }
       }

       if(bin4 !== undefined) {
           if(subBin3 !== undefined) {
               if(subBin3 > bin3) bin3 = subBin3;
           }

           if(subBin4 !== undefined) {
               if(subBin4 > bin4) bin4 = subBin4;
           }
       }


       if(bin1 == undefined) {
          total = 0;
          notes = 0;
       } else if(bin2 == undefined) {
          total = bin1;
          notes = 1;
      } else if(bin3 == undefined) {
          total = bin1 + bin2;
          notes = 2;
       } else if(bin4 == undefined) {
          total = bin1 + bin2 + bin3;
          notes = 3;
       }  else {
          total = bin1 + bin2 + bin3 + bin4;
          notes = 4;
       }


       // Define os total das medias depois que ja trocou as subs pelos os bins :)
       mediaTotal.bin1 += (bin1 !== undefined) ? bin1 : 0;
       mediaTotal.bin2 += (bin2 !== undefined) ? bin2 : 0;
       mediaTotal.bin3 += (bin1 !== undefined) ? bin3 : 0;
       mediaTotal.bin4 += (bin1 !== undefined) ? bin4 : 0;

       determineMedia(value, total, notes);


       // Add media total da materia
       value.element.find('td').last().text(total);

    });

    // Adiciona a coluna de media do bimistre
    var lastTableHtml = $table.find('tr').last().clone();
    $table.append( lastTableHtml );
    var lastTable = $table.find('tr').last();
    lastTable.hide();

    lastTable.css('background', 'rgba(63, 135, 193, 0.41)');

    var setColumnText = function(column, text) {
        lastTable.find('td:eq('+ column +')').text(text);
    };

    setColumnText(0, "Media total das materias");
    if(mediaTotal.bin1 !== undefined) setColumnText(1, (mediaTotal.bin1 / (entityCollection.length - 1) ).toFixed(1) );
    if(mediaTotal.bin2 !== undefined) setColumnText(2, (mediaTotal.bin2 / (entityCollection.length - 1) ).toFixed(1) );
    if(mediaTotal.bin3 !== undefined) setColumnText(5, (mediaTotal.bin3 / (entityCollection.length - 1) ).toFixed(1) );
    if(mediaTotal.bin4 !== undefined) setColumnText(6, (mediaTotal.bin4 / (entityCollection.length - 1) ).toFixed(1) );
    setColumnText(3, '-');
    setColumnText(4, '-');
    setColumnText(7, '-');
    setColumnText(8, '-');
    setColumnText(9, '-');

    lastTable.fadeIn(500);







    $table.append('<br><p class="credits">Unicesumar Extend - Extesão não oficial, criado por Rafael Dantas <small>(rafael@webdantas.com.br)</small> <br> <a href="https://github.com/wgrafael/unicesumar-extend">Código no github</a></p>');
});
