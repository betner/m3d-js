
/**
 * Global reference to the WebGL context 
 */
var gl;

/**
 * Global reference to the current shader program
 */
var shaderProgram;


/**
 * ESContext holds data that is needed
 * in WegGL applications.
*/
function ESContext()
{ 
    // WebGL object
    this.gl = null;

    // Viewport
    this.width = 0;          
    this.height = 0; 

    // Functions
    this.drawFunc = null;    
    this.keyFunc = null;
    this.updateFunc = null;

    // Shader data object
    this.shaderData = null;

    // Object holding various program data
    this.userData = null;
}

/**
 * Holds data for handling shader programs
 * and related data.
 */
function ShaderData()
{
    this.vertexPositionAttribute = null;
    this.projectionMatrixUniform = null;
    this.modelViewMatrixUniform  = null;
    this.shaderProgram = null;
}

function initContext( context, canvas )
{
    context.gl = canvas.getContext('experimental-webgl');

    if (!context.gl) {
        alert('Unable to get OpenGL ES context');
        return;
    }

    context.shaderData = new ShaderData();
    context.width  = canvas.width;
    context.height = canvas.height;

    gl = context.gl;
}
        

/**
 * Load shader from HTML page.
 * Code from WebGL cookbook @ http://learningwebgl.com/cookbook
*/
function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
      return null;
    }
 
    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
      if (k.nodeType == 3) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }
 
    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }
 
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
 
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }
 
    return shader;
  }

/**
 * Test function, initializes basic shaders for testing
 */
function initTestShaders( vertexShaderName, fragmentShaderName, context )
{
    var vertexShader   = getShader( gl, vertexShaderName );
    var fragmentShader = getShader( gl, fragmentShaderName );
    var vPos;
    var mvMatrix;
    var pMatrix;

    shaderProgram = gl.createProgram();
    gl.attachShader( shaderProgram, vertexShader );
    gl.attachShader( shaderProgram, fragmenstShader );
    gl.linkProgram( shaderProgram );

    // Check if linking succeeded
    if (!gl.getProgramParameter( shaderProgram, gl.LINK_STATUS )) {
        alert( gl.getProgramInfoLog( shaderProgram ) );
        return 0;
    }
     
    gl.useProgram( shaderProgram );
    vPos = gl.getAttributeLocation( shaderProgram, 'a_vPos' );
    gl.enableVertexAttribArray( vPos );

    mvMatrix = gl.getAttributeLocation( shaderProgram, 'u_mvMatrix' );
    pMatrix  = gl.getAttributeLocation( shaderProgram, 'u_pMatrix' );

    // Update shader data in the context
    context.shaderData.shaderProgram = shaderProgram;
    context.shaderData.vertexPositionAttribute = vPos;
    context.shaderData.modelViewMatrixUniform  = mvMatrix;
    context.shaderData.projectionMatrixUniform = pMatrix;
}