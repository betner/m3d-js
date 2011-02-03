

/*
 * Check if the system supports WebGL array Float32Array 
 */
if (typeof Float32Array === 'undefined') {
    ArrayType = Array;
} else {
    ArrayType = Float32Array;
}



// Array is passed by ref
// if you want by val use anArray.slice()

var vec3 = {};

/**
 * Create a new 3D vector.
 *
 * @param vector - optional vector to get initial values from
 * @return reference to the new vector
 */
vec3.create = function( vector ) 
{
    var result = new ArrayType( 3 );

    if (vector) 
    {
        result[0] = vector[0];
        result[1] = vector[1];
        result[2] = vector[2];
    }
    else
    {
        result[0] = result[1] = result[2] = 0;
    }

    return result;
};

/**
 * Get the length of the vector.
 *
 * @param vector 
 * @return a scalar value for the length
 */
vec3.length = function( vector )
{
    var x = vector[0], y = vector[1], z = vector[2];
    return Math.sqrt( x*x + y*y + z*z );
};


/**
 * Normalize a vector 
 * If the optional parameter isn't provided
 * the result will be put in the vector.
 *
 * @param vector - vector to normalize
 * @param result - optional vector to put the result in
 * @return the normalized vector
 */
vec3.normalize = function( vector, result )
{
    if (!result) result = vector;

    var length = vec3.length( vector );

    if (!length) {
        result[0] = 0, result[1] = 0, result[2] = 0;
        return result;
    }
    
    result[0] = vector[0] / length;
    result[1] = vector[1] / length;
    result[2] = vector[2] / length;

    return result;
};


/**
 * Calculate dot product
 *
 * @param lhs - left hand side vector
 * @param rhs - right hand side vector
 * @return a scalar value for the dot product
 */
vec3.dot = function( lhs, rhs )
{
    return lhs[0]*rhs[0] + lhs[1]*rhs[1] + lhs[2]*rhs[2];
};


/**
 * Calculate the cross product of two vectors
 * If the optional parameter isn't provided
 * a new vector will be created and returned.
 *
 * @param lhs - left hand side vector
 * @param rhs - right hand side vector
 * @return the cross product vector
 */
vec3.cross = function( lhs, rhs, result )
{
    if (!result) result = vec3.create();

    var a1b2 = lhs[0] * rhs[1], a1b3 = lhs[0] * rhs[2];
    var a2b1 = lhs[1] * rhs[0], a2b3 = lhs[1] * rhs[2];
    var a3b1 = lhs[2] * rhs[0], a3b2 = lhs[2] * rhs[1];

    result[0] = a2b3 - a3b2;
    result[1] = a3b1 - a1b3;
    result[2] = a1b2 - a2b1;
    
    return result;   
};


/**
 * Calculate the sum of two vectors
 * If the optional parameter isn't provided
 * a new vector will be created and returned.
 *
 * @param lhs - left hand side vector
 * @param rhs - right hand side vector
 * @return the sum as a vector
 */
vec3.add = function( lhs, rhs, result )
{
    if (!result) result = vec3.create();

    result[0] = lhs[0] + rhs[0];
    result[1] = lhs[1] + rhs[1];
    result[2] = lhs[2] + rhs[2];

    return result;
};


/*
 * Copy the value of a vector
 *
 * @param vector - a vector to copy
 * @param result - a vector to receive the copy
 * @result the copy
 */
vec3.set = function( vector, result )
{
    result[0] = vector[0];
    result[1] = vector[1];
    result[2] = vector[2];

    return result;
};


/**
 * Return the vector as a string
 *
 * @param vector - a vector to print
 * @return a string
 */
vec3.string = function( vector )
{
    return "| " + vector[0] + " |\n" + 
           "| " + vector[1] + " |\n" + 
           "| " + vector[2] + " |\n";
};




/**********
 * Matrix *
 **********/

mat4 = {};

// Private variable holding values for the identity matrix
mat4._id = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

mat4.set = function( matrix, result )
{
    // column 1
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    // column 2
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    //column 3
    result[8]  = matrix[8];
    result[9]  = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    // column 4
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];

    return result;
};


/**
 * Create a new 4*4 matrix
 * If template matrix is given the new matrix will
 * a copy, otherwise the identity matrix will be returned.
 *
 * @param matrix  - a template matrix to copy
 * @return result - a copy of the parameter or the id matrix
 */
mat4.create = function( matrix )
{
    var result = new ArrayType( 16 );

    if 
        (matrix) mat4.set( matrix, result );
    else 
        mat4.identity( result );
    
    return result;
};

mat4.identity = function( result )
{
    return mat4.set( mat4._id, result );
};


mat4.mult = function( lhs, rhs, result )
{
    if (!result) result = lhs;
    
    // col, row
    var a00 = lhs[0],  a01 = lhs[1],  a02 = lhs[2],  a03 = lhs[3];
    var a10 = lhs[4],  a11 = lhs[5],  a12 = lhs[6],  a13 = lhs[7];
    var a20 = lhs[8],  a21 = lhs[9],  a22 = lhs[10], a23 = lhs[11];
    var a30 = lhs[12], a31 = lhs[13], a32 = lhs[14], a33 = lhs[15];
    
    var b00 = rhs[0],  b01 = rhs[1],  b02 = rhs[2],  b03 = rhs[3];
    var b10 = rhs[4],  b11 = rhs[5],  b12 = rhs[6],  b13 = rhs[7];
    var b20 = rhs[8],  b21 = rhs[9],  b22 = rhs[10], b23 = rhs[11];
    var b30 = rhs[12], b31 = rhs[13], b32 = rhs[14], b33 = rhs[15];

    result[0] =  a00*b00 + a10*b01 + a20*b02 + a30*b03;
    result[1] =  a01*b00 + a11*b01 + a21*b02 + a31*b03;
    result[2] =  a02*b00 + a12*b01 + a22*b02 + a32*b03;
    result[3] =  a03*b00 + a13*b01 + a23*b02 + a33*b03;

    result[4] =  a00*b10 + a10*b11 + a20*b12 + a30*b13;
    result[5] =  a01*b10 + a11*b11 + a21*b12 + a31*b13;
    result[6] =  a02*b10 + a12*b11 + a22*b12 + a32*b13;
    result[7] =  a03*b10 + a13*b11 + a23*b12 + a33*b13;

    result[8] =  a00*b20 + a10*b21 + a20*b22 + a30*b23;
    result[9] =  a01*b20 + a11*b21 + a21*b22 + a31*b23;
    result[10] = a02*b20 + a12*b21 + a22*b22 + a32*b23;
    result[11] = a03*b20 + a13*b21 + a23*b22 + a33*b23;

    result[12] = a00*b30 + a10*b31 + a20*b32 + a30*b33;
    result[13] = a01*b30 + a11*b31 + a21*b32 + a31*b33;
    result[14] = a02*b30 + a12*b31 + a22*b32 + a32*b33;
    result[15] = a03*b30 + a13*b31 + a23*b32 + a33*b33;
    
    return result;
};


mat4.multVec3 = function( matrix, vector, result )
{
    var x = vector[0], y = vector[1], z = vector[2];

    if (!result) result = vector;
    
    result[0] = matrix[0]*x + matrix[4]*y + matrix[8] *z + matrix[12];
    result[1] = matrix[1]*x + matrix[5]*y + matrix[9] *z + matrix[13];
    result[2] = matrix[2]*x + matrix[6]*y + matrix[10]*z + matrix[14];

    return result;
};

mat4.scale = function( matrix, scale, result )
{
    var sx = scale[0], sy = scale[1], sz = scale[2];

    if (!result) 
    {
        result = matrix;
        
        result[0] *= sx;
        result[1] *= sx;
        result[2] *= sx;
        result[3] *= sx;
        
        result[4] *= sy;
        result[5] *= sy;
        result[6] *= sy;
        result[7] *= sy;
        
        result[8]  *= sz;
        result[9]  *= sz;
        result[10] *= sz;
        result[11] *= sz;
    } 
    else // use matrix as prototyp for new matrix
    {
        result[0] = matrix[0] * sx;
        result[1] = matrix[1] * sx;
        result[2] = matrix[2] * sx;
        result[3] = matrix[3] * sx;
        
        result[4] = matrix[4] * sy;
        result[5] = matrix[5] * sy;
        result[6] = matrix[6] * sy;
        result[7] = matrix[7] * sy;
        
        result[8]  = matrix[8]  * sz;
        result[9]  = matrix[9]  * sz;
        result[10] = matrix[10] * sz;
        result[11] = matrix[11] * sz;
    }
        
    return result;
};

mat4.translate = function( matrix, vector, result )
{ 
    var tx = vector[0], ty = vector[1], tz = vector[2];

    if (!result) result = matrix;

    matrix[12] += matrix[0]*tx + matrix[4]*ty + matrix[8]* tz;
    matrix[13] += matrix[1]*tx + matrix[5]*ty + matrix[9]* tz;
    matrix[14] += matrix[2]*tx + matrix[6]*ty + matrix[10]*tz;
    matrix[15] += matrix[3]*tx + matrix[7]*ty + matrix[11]*tz;

    return result;
};


mat4.rotate = function( matrix, angle, axis, result )
{
};

mat4.rotateX = function( matrix, angle, result )
{
    if (!result) result = matrix;
};

mat4.rotateY = function( matrix, angle, result )
{
    if (!result) result = matrix;
};

mat4.rotateZ = function( matrix, angle, result )
{
    if (!result) result = matrix;
};

mat4.frustum = function( left, right, bottom, top, near, far, result )
{
    var dx = (right - left);
    var dy = (top - bottom);
    var dz = (far - near);

    // if no result argument is given create a new identity matrix
    if (!result) result = mat4.create();
    
    result[0] = (near * 2) / dx;
    //result[1] = 0;
    //result[2] = 0;
    //result[3] = 0;

    //result[4] = 0;
    result[5] = (near * 2) / dy;
    //result[6] = 0;
    //result[7] = 0;

    result[8]  =  (right + left) / dx;
    result[9]  =  (top + bottom) / dy;
    result[10] = -(far + near) / dz;
    result[11] = -1;

    //result[12] = 0;
    //result[13] = 0;
    result[14] = -(far * near * 2) / dz;
    result[15] = 0;

    return result;
};

mat4.perspective = function( fovy, aspect, near, far, result )
{
    var height = Math.tan( fovy / 360.0 * Math.PI ) * near;
    var width  = height * aspect;
    
    // if no result argument is given create a new identity matrix
    if (!result) result = mat4.create();

    return mat4.frustum( -width, width, -height, height, near, far, result );
};

mat4.ortho = function( left, right, bottom, top, near, far, result )
{
    var dx = right - left;
    var dy = top   - bottom;
    var dz = far   - near;
    
    // check for division by zero
    if ( (dx == 0.0) || (dy == 0.0) || (dz == 0.0) )
        return;

    if (!result) result = mat4.create();
   
    result[0]  =  2 / dx;
    result[5]  =  2 / dy;
    result[10] = -2 / dz;
    result[12] = -(left + right) / dx;
    result[13] = -(top + bottom) / dy;
    result[14] = -(far + near)   / dz;
   
    return result;
};


mat4.lookAt = function( result )
{
};

mat4.string = function( matrix )
{
    return "| " + matrix[0] + " " + matrix[4] + " " + matrix[8]  + " " + matrix[12] + " |\n" +
           "| " + matrix[1] + " " + matrix[5] + " " + matrix[9]  + " " + matrix[13] + " |\n" +
           "| " + matrix[2] + " " + matrix[6] + " " + matrix[10] + " " + matrix[14] + " |\n" +
           "| " + matrix[3] + " " + matrix[7] + " " + matrix[11] + " " + matrix[15] + " |\n";
};

