(function($) {
    
    $.fn.extend({
        
        prettycolors: function(options) {
           
            var settings; 
            
            this.defaults = {
                holderId: '#prettycolors',
                frequency: .5,
                amplitude: 128,
                center: 127,
                boxSize: 100,
                classes: {
                    row: 'row',
                    box: 'box',
                    heart: 'icon-heart'
                }
            };

            settings = $.extend({}, this.defaults, options);


            function convertToHex(r,g,b) {                                                                                                                                         
                                                                                                                                                                                   
                var convertString, x, y, hex;                                                                                                                                      
                                                                                                                                                                                   
                convertString = '0123456789ABCDEF';                                                                                                                                
                
                hex = '#';                                                                                                                                             
                               
                hex += convertString.substr((r >> 4) & 0x0F, 1) + convertString.substr(r & 0x0F, 1); 
                hex += convertString.substr((g >> 4) & 0x0F, 1) + convertString.substr(g & 0x0F, 1);
                hex += convertString.substr((b >> 4) & 0x0F, 1) + convertString.substr(b & 0x0F, 1);

                return hex;                                                                                                                                                                                                                                                                                                                                          
            }                 

            function generateColors(n) {
                
                var r, g, b, colors;

                colors = [];

                for(var i = 0; i <= n; i++) {
                    r = Math.sin(settings.frequency * i) * settings.amplitude + settings.center; 
                    g = Math.sin(settings.frequency * i + 2) * settings.amplitude + settings.center;
                    b = Math.sin(settings.frequency * i + 4) * settings.amplitude + settings.center;
                    colors[i] = convertToHex(r,g,b);
                }                

                return colors;

            }

            function generateGrid() {
                
                var w, h, nRows, nCols, topPadding, colors, c, boxEl, rowEl;
                
                w = $(window).width();
                h = $(window).height(); 

                nRows = Math.floor(h/settings.boxSize);
                nCols = Math.floor(w/settings.boxSize);

                topPadding = (h - (nRows * settings.boxSize)) / 2;

                $(settings.holderId).css('padding-top', topPadding);

                colors = generateColors(nRows*nCols);

                c = 0;

                for(i = 0; i < nRows; i++) {

                    rowEl = document.createElement('div');
                    $(rowEl).addClass(settings.classes.row);
                    
                    for(var j = 0; j < nCols; j++) {;
                        boxEl = document.createElement('div');
                        $(boxEl).css('background-color', colors[c]).addClass(settings.classes.box);
                        $(boxEl).css('width', settings.boxSize+'px').css('height', settings.boxSize+'px');
                        $(boxEl).appendTo($(rowEl));
                        c++;
                    }

                    $(rowEl).appendTo($(settings.holderId)); 
                     
                }
                
            }

            return this.each(function() {
                
                generateGrid();
                
            });
        
        }
    
    });

})(jQuery);
