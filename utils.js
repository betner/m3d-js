
var gl;

var esContext = { 'userData'   : null,
                  'gl'         : null,
                  'width'      : 0,
                  'height'     : 0,
                  'drawFunc'   : null,
                  'keyFunc'    : null,
                  'updateFunc' : null };



function initContext( context, canvas )
{
    context.gl = canvas.getContext('experimental-webgl');

    if (!context.gl) 
        alert('Unable to get OpenGL ES context');

    gl = context.gl;
}
        
