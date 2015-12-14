var entityCollection = [];
var $table = $("table:eq(3)");

$table.each(function(v, i) {
    
    $(this).find('tr').each(function(k, j) {
        var entity = {};
        $tr = $(this);
        entity.name = $tr.find("td:eq(0)").text();
        entity.element = $(this);
        
        var getNote = function(position) {
            return ($tr.find('td:eq('+ position +')').text() != '-') ? parseFloat($tr.find('td:eq('+ position +')').text()) : undefined;
        };
        
        entity.notes = {
            bin1: {
                element: $tr.find('td:eq(1)'),
                note: getNote(1)
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
        
        entityCollection.push(entity);
    });
    
});

function determineMedia(entity, total, notes) {
    var result = total - 24.0;
    var divide = (notes > 0) ? notes : 0;
    var toPass = result / ( 4 - divide );
    var color = (toPass > 0) ? 'green' : 'red';
    var prefixBin = "bin";

    if(Math.abs(toPass) > 10.0 && toPass < 0) { 
        entity.element.css('background', '#F75D59');
        color = 'white';
    } else if(toPass > 0) {
        entity.element.css('background', '#59E817');
        color = 'black';
    }

    var entity = entity.notes;

    toPass = Math.abs(toPass).toFixed(1);
    var changeNote = function(bin) {
        entity[bin].element.html(toPass).css('color', color);   
    };




    subBin1 = entity.subBin1.note;
    subBin2 = entity.subBin2.note; 
    if(notes > 2 && notes < 4) {
        if(subBin1 !== undefined && subBin2 !== undefined) {
            alert("Ainda não calcula o valor que você precisa para sub, em breve!");
        } 
    }


    
    subBin3 = entity.subBin3.note;
    subBin4 = entity.subBin4.note; 
    if(notes > 4) {
        if(subBin3 !== undefined && subBin4 !== undefined) {
            alert("Ainda não calcula o valor que você precisa para sub, em breve!");
        } 
    }
   

    for(i=notes+1;i<4;i++) {
        changeNote( prefixBin + i );
    }
}


$.each(entityCollection, function(index, value) { 
   if(index != 0) {
       var bin1 = value.notes.bin1.note;
       var bin2 = value.notes.bin2.note;
       var subBin1 = value.notes.subBin1.note;
       var subBin2 = value.notes.subBin2.note; 

       var bin3 = value.notes.bin3.note;
       var bin4 = value.notes.bin4.note;
       var subBin3 = value.notes.subBin3.note;
       var subBin4 = value.notes.subBin4.note; 

       var total, notes;

       if(bin1 == undefined) {
          total = 0;   
          notes = 0;
       } else if(bin2 == undefined) {
          total = bin1; 
          notes = 1;
       } else if(bin3 == undefined) {
          if(subBin1 !== undefined) {
              if(subBin1 > bin1) bin1 = subBin1;
          }

          if(subBin2 !== undefined) {
              if(subBin2 > bin2) bin2 = subBin2;            
          } 

          total = bin1 + bin2;
          notes = 2;
       } else if(bin4 == undefined) {
          total = bin1 + bin2 + bin3;
          notes = 3;
       }  else {
          if(subBin3 !== undefined) {
              if(subBin3 > bin3) bin3 = subBin3;
          }

          if(subBin4 !== undefined) {
              if(subBin4 > bin4) bin4 = subBin4;            
          }  
          total = bin1 + bin2 + bin3 + bin4;
          notes = 4;
       }

       determineMedia(value, total, notes);
   }
});

$table.append('<br><p class="credits">Unicesumar Extend - Extesão não oficial, criado por Rafael Dantas <small>(rafael@webdantas.com.br)</small> <br> <a href="https://github.com/wgrafael/unicesumar-extend">Código no github</a></p>');